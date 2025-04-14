import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { j, publicProcedure } from "../jstack";

export const dynamic = "force-dynamic";

export const authRouter = j.router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c }) => {
    const auth = await currentUser();

    if (!auth) {
      return c.json({ isSynced: false });
    }

    const user = await db.user.findFirst({
      where: { externalId: auth.id },
    });



    if (!user) {
      await db.user.create({
        data: {
          quotaLimit: 100,
          externalId: auth.id,
          email: auth.emailAddresses[0]?.emailAddress ?? "",
        },
      });
    }
    return c.json({ isSynced: true });
  }),
});

// route.ts
