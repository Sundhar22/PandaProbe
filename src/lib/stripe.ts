import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-03-31.basil",
  typescript: true
})

export const creatCheckoutSession = async ({ userEmail, userId }: { userEmail: string, userId: string }) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1RDMEiC0yLUGlTBn9Iz2l00s",
        quantity: 1
      }
    ]
    , mode: "payment"
    , success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`
    , cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    customer_email: userEmail,
    metadata: {
      userId,
    }

  })
  return session
}
