"use client"

import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParams = useSearchParams()
  const intent = searchParams.get("intent")

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <SignIn
        forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : "/dashboard"}
      />
    </div>
  )
}

export default Page
