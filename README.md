PandaProbe is a SaaS application that helps you monitor and track user events in your applications. It provides real-time insights and analytics for your business growth.

![PandaProbe Logo](public/brand-asset-heart.png)

## 📋 Overview

PandaProbe allows you to track custom events, organize them into categories, and receive insights about user behavior in your application. With both free and pro plans available, it's suitable for businesses of all sizes.

## ✨ Features

- **Event Tracking**: Monitor and analyze custom events in your applications
- **Event Categories**: Organize events into meaningful categories
- **Usage Dashboard**: View your event consumption and limits
- **One-time Payment Model**: Pay once, own forever pricing structure
- **Plan Tiers**: Free and Pro plans with different usage limits

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Node.js with custom API router
- **Database**: Prisma ORM
- **Authentication**: Custom auth system
- **Payment Processing**: Stripe integration
- **Deployment**: Cloudflare (using Wrangler)

## 📊 Plans and Limits

PandaProbe offers two plans:

**Free Plan**:
- Limited event tracking
- Limited category creation
- Basic support

**Pro Plan**:
- Increased event tracking limits
- More available categories
- Premium support
- One-time payment

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm, pnpm, or Bun
- Database (compatible with Prisma)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/PandaProbe.git
cd PandaProbe
```

2. Install dependencies
```bash
pnpm install
# or
npm install
# or
bun install
```

3. Set up environment variables (create a `.env` file based on provided examples)

4. Set up the database
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server
```bash
pnpm dev
# or
npm run dev
# or
bun dev
```

## 📹 Demo Video

For a comprehensive overview of PandaProbe's features and functionality, please refer to the attached demo video. The video demonstrates:

- How to set up event tracking
- Creating and managing event categories
- Viewing analytics data
- Upgrading from Free to Pro plan
- Best practices for implementation

## 📁 Project Structure

- app: Next.js routes and pages
- components: Reusable React components
- server: Backend API routes and handlers
- prisma: Database schema and migrations
- public: Static assets

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
