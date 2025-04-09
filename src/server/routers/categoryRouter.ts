import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { startOfMonth } from "date-fns";
import { z } from "zod";
import { CATEGORY_COLOR_VALIDATOR, CATEGORY_EMOJI_VALIDATOR, CATEGORY_NAME_VALIDATOR } from "@/lib/validators";
import { parseColorInt } from "@/utils";
export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    const now = new Date();
    const firstDayOfMonth = startOfMonth(now);
    const categories = await db.eventCategory.findMany({
      where: {
        userId: ctx.user.id,
      },
      select: {
        id: true,
        name: true,
        color: true,
        emoji: true,
        updatedAt: true,
        createdAt: true,

        events: {
          where: { createdAt: { gte: firstDayOfMonth } },
          select: {
            fields: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            events: {
              where: { createdAt: { gte: firstDayOfMonth } },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    const categoriesWithCounts = categories.map((category) => {
      const uniqueFieldNames = new Set<string>();
      let lastPing: Date | null = null;

      category.events.forEach((event) => {
        Object.keys(event.fields as object).forEach((fieldName) => {
          uniqueFieldNames.add(fieldName);
        });
        if (!lastPing || event.createdAt > lastPing) {
          lastPing = event.createdAt;
        }
      });

      return {
        id: category.id,
        name: category.name,
        emoji: category.emoji,
        color: category.color,
        updatedAt: category.updatedAt,
        createdAt: category.createdAt,
        uniqueFieldCount: uniqueFieldNames.size,
        eventsCount: category._count.events,
        lastPing,
      };
    });

    return c.superjson({ categories: categoriesWithCounts });
  }),

  deleteCategory: privateProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ c, ctx, input }) => {
      const { name } = input;
      await db.eventCategory.delete({
        where: {
          name_userId: {
            name,
            userId: ctx.user.id,
          },
        },
      });
      return c.json({
        success: true,
      });
    }),

  createEventCategory: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        color:
          CATEGORY_COLOR_VALIDATOR, emoji: CATEGORY_EMOJI_VALIDATOR,
      })
    )
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx
      const { color, name, emoji } = input


      const eventCategory = await db.eventCategory.create({
        data: {
          name: name.toLowerCase(),
          color: parseColorInt(color),
          emoji,
          userId: user.id,
        },
      })

      return c.json({ eventCategory })
    }),

  
  insertQuickstartCategories: privateProcedure.mutation(async ({ ctx, c }) => {
    const categories = await db.eventCategory.createMany({
      data: [
        { name: "bug", emoji: "🐞", color: parseColorInt("#FF6B6B") },
        { name: "sale", emoji: "🪙", color: parseColorInt("#FFA07A") },
        { name: "question", emoji: "❓", color: parseColorInt("#2ECC71")  },
      ].map((category) => ({
        ...category,
        userId: ctx.user.id,
      })),
    })

    return c.json({ success: true, count: categories.count })
  }),
});
