import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { creatCheckoutSession } from "@/lib/stripe";

export const paymentsRouter = router({
  createCheckoutSession: privateProcedure.mutation(async ({ c, ctx }) => {
    const { user } = ctx

    const session = await creatCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    })

    return c.json({ url: session.url })
  }),
  getUserPlan: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx
    return c.json({ plan: user.plan })
  }),
}) 
