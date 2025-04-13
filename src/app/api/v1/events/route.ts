import { FREE_QUOTA, PRO_QUOTA } from "@/config";
import { db } from "@/db";
import { DiscordClient } from "@/lib/discord-client";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";
import { unknown, z } from "zod";

const REQUEST_VALIDATOR = z.object({
  category: CATEGORY_NAME_VALIDATOR,
  fields: z.record(z.string().or(z.number()).or(z.boolean())).optional(),
  description: z.string().optional(),
}).strict();


export const POST = async (req: NextRequest) => {
  try {


    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Invalid auth header format. Expected [APIKEY]" }, { status: 401 })
    }

    const apiKey = authHeader.split(" ")[1]

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json({ message: "Invalid API key" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { 
        apiKey
      },
      include: {
        EventCategories: true
      }
    })

    if (!user) {
      return NextResponse.json({ message: "Invalid API key" }, { status: 401 })
    }

    if (!user.discordId) {
      return NextResponse.json({ message: "Please add your discord id in your account settings" }, { status: 403 })
    }

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()+1
    const currentYear = currentDate.getFullYear()


    const quota = await db.quota.findFirst({

      where: {
        userId: user.id,
        month: currentMonth,
        year: currentYear
      }
    })

    const quotaLimit = user.plan === "FREE" ? FREE_QUOTA.MAX_EVENTS_PER_MONTH : PRO_QUOTA.MAX_EVENTS_PER_MONTH

    if (quota && quota.count >= quotaLimit) {
      return NextResponse.json({ message: "You have reached your event limit for this month. Please upgrade your plan for more events. " }, { status: 429 })
    }
    const discord = new DiscordClient(process.env.DISCORD_BOT_TOKEN as string)

    const createDm = await discord.createDM(user.discordId)



    let requestData = unknown

    try {
      requestData = await req.json()
    } catch (err) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
    }

    const validated = REQUEST_VALIDATOR.parse(requestData)


    const category = user.EventCategories.find((category) => category.name === validated.category)

    if (!category) {
      return NextResponse.json({ message: `Category ${validated.category} not found` }, { status: 404 })
    }


    const eventData = {
      title: `${category.emoji} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`,
      description: validated.description || `A new ${category.name} event has been occured!`,
      color: category.color,
      fields: Object.entries(validated.fields || {}).map(([key, value]) => ({
        name: key,
        value: value.toString(),
        inline: true
      })),
      timestamp: new Date().toISOString(),
    }


    const event = await db.event.create({
      data: {
        name: category.name,
        formattedMessage: `${eventData.title}\n\n${eventData.description}`,
        userId: user.id,
        fields: validated.fields || {},
        eventCategoryId: category.id
      }
    })

    try {
      await discord.sendEmbed(createDm.id, eventData)
      await db.event.update({
        where: {
          id: event.id
        },
        data: {
          deliveryStatus: "DELIVERED",
        }
      }
      )
      await db.quota.upsert({
        where: {
          userId: user.id,
          month: currentMonth,
          year: currentYear
        },
        update: {
          count: {
            increment: 1
          }
        },
        create: {
          userId: user.id,
          month: currentMonth,
          year: currentYear,
          count: 1
        }
      })
    } catch (err) {

      await db.event.update({
        where: {
          id: event.id
        },
        data: {
          deliveryStatus: "FAILED",
        }
      }
      )
      console.log(err)
      return NextResponse.json({ message: "Failed to deliver event", eventId: event.id }, { status: 500 })
    }

    return NextResponse.json({ message: "Event delivered successfully", eventId: event.id }, { status: 200 })
  } catch (error) {

    console.error(error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 422 })
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
