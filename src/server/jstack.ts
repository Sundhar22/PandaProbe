import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { HTTPException } from "hono/http-exception";
import { jstack } from "jstack"

interface Env {
  Bindings: {
    DATABASE_URL: string,
    DISCORD_BOT_TOKEN: string,
    NEXT_PUBLIC_URL: string,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string,
    CLERK_SECRET_KEY: string,
    STRIPE_SECRET_KEY: string,

  }
}



export const j = jstack.init<Env>()

const authMiddleware = j.middleware(async ({ c, next }) => {
  const authHeader = c.req.header("Authorization");

  if (authHeader) {
    const apiKey = authHeader.split(" ")[1]; // bearer <API_KEY>

    const user = await db.user.findUnique({
      where: { apiKey },
    });

    if (user) return next({ user });
  }

  const auth = await currentUser();

  if (!auth) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  return next({ user });
});

export const baseProcedure = j.procedure;
export const publicProcedure = baseProcedure;
export const privateProcedure = publicProcedure.use(authMiddleware);
