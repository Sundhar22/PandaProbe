/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {

    DATABASE_URL: process.env.DATABASE_URL,
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY

  },
}


export default nextConfig
