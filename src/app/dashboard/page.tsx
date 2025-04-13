import { DashboardPage } from "@/components/dashboard-page";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/dist/client/components/navigation";
import React from "react";
import { DashboardPageContent } from "./dashboard-page-content";
import CreateEventCategory from "@/components/create-event-category";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { creatCheckoutSession } from "@/lib/stripe";
import { PaymentSuccessModal } from "@/components/payment-success";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const Page = async ({ searchParams }: PageProps) => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const dbUser = await db.user.findUnique({
    where: {
      externalId: user.id,
    },
  });

  if (!dbUser) {
    return redirect("/welcome")
  }

  const resolvedSearchParams = await searchParams;

  const intent = resolvedSearchParams.intent;

  if (intent === "upgrade") {
    const session = await creatCheckoutSession({
      userEmail: dbUser.email,
      userId: dbUser.id,
    })

    if (session.url) redirect(session.url)
  }

  const success = resolvedSearchParams.success;
  if (!dbUser) {
    redirect("/sign-up");
  }
  return <>

    {success ? <PaymentSuccessModal /> : null}
    <DashboardPage cta={<CreateEventCategory>
      <Button> <Plus className=
        "size-4 mr-2"
      /> New Category</Button>
    </CreateEventCategory>} title="Dashboard">
      <DashboardPageContent />
    </DashboardPage>;
  </>
};

export default Page;
