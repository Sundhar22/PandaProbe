import React from "react";
import { Check } from "lucide-react";
import Heading from "@/components/heading";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import ShinyButton from "@/components/shiny-button";
import MockDiscordUI from "@/components/mock-discord-ui";

const Page = () => {
  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-current">
          <div className="relative text-current mx-auto flex flex-col items-center gap-10">
            <div className="">
              <Heading>
                <span>Real-Time SaaS Insights,</span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">
                  Delivered to Your Discord
                </span>
              </Heading>
            </div>
            <div className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              PandaProbe is a easiest way to monitor your SaaS. Get instant
              notification for{" "}
              <span className="font-semibold text-gray-700">
                sales, new signups, or any other events
              </span>{" "}
              directly to your Discord server.
            </div>

            <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col sm:text-center">
              {[
                "Real time Discord updates & alerts",
                "Buy once, use forever",
                "Track sales, new users, or any other events",
                "Easy to setup, no coding required",
              ].map((item, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <Check
                    key={index}
                    className="size-5 shrink-0 text-brand-700  "
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="w-full max-w-80">
              <ShinyButton
                href="/sign-up"
                className="relative rounded  z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                Start Free Trial Now
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="relative bg-brand-25 pb-4">
        <div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
        <div className="relative mx-auto ">
          <MaxWidthWrapper className="relative">
            <div className=" -m-2 rounded-xl bg-gray-900/5 p-2 ring-1  ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 ">
              <MockDiscordUI />
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
      <section></section>
      <section></section>
    </>
  );
};

export default Page;
