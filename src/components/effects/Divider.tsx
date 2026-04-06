import React from "react"
import { cn } from "@/lib/utils"

type DividerProps = React.ComponentPropsWithoutRef<"div">

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, children, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      className={cn(
        "mx-auto my-6 flex w-full items-center justify-between gap-3 text-sm text-gray-500",
        className,
      )}
      {...props}
    >
      {children ? (
        <>
          <div className="h-px w-full bg-gradient-to-r from-transparent to-gray-200" />
          <div className="whitespace-nowrap text-inherit">{children}</div>
          <div className="h-px w-full bg-gradient-to-l from-transparent to-gray-200" />
        </>
      ) : (
        <div className="h-px w-full bg-gradient-to-l from-transparent via-gray-200 to-transparent" />
      )}
    </div>
  ),
)

Divider.displayName = "Divider"

export { Divider }
