import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-[20px] font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-[24px] shrink-0 [&>svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-neutral-2 text-main hover:bg-neutral-0",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-grey-0 bg-background shadow-xs hover:bg-accent hover:text-white hover:border-orange-2",
        secondary:
          "bg-orange-2 text-secondary-foreground hover:bg-orange-0",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link: "text-main underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[44px] p-[10px]",
        sm: "h-[36px] p-[8px] gap-1.5",
        lg: "h-[52px] p-[14px]",
        icon: "size-[44px]",
        "icon-sm": "size-[36px]",
        "icon-lg": "size-[52px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export default function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export {Button, buttonVariants}
