import { cn } from "@/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const MaxWidthWrapper = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        "h-full w-full max-w-screen-xl mx-auto md:px-20 px-2.5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
