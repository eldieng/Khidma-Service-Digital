"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-ksd-orange text-white hover:bg-ksd-orange-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5",
        secondary:
          "bg-ksd-blue text-white hover:bg-ksd-blue-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5",
        outline:
          "border-2 border-ksd-blue text-ksd-blue hover:bg-ksd-blue hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-ksd-blue",
        ghost:
          "text-ksd-blue hover:bg-ksd-blue/10 dark:text-white dark:hover:bg-white/10",
        link: "text-ksd-orange underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
