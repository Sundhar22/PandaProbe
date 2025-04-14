"use client"

import { SignUp } from "@clerk/nextjs"

const Page = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <SignUp fallbackRedirectUrl="/welcome" forceRedirectUrl="/welcome" />
    </div>
  )
}

export default Page
