import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-ui-blue-primary text-white hover:bg-ui-blue-primary/80",
        secondary:
          "border-transparent bg-ui-blue-secondary text-slate-900 hover:bg-ui-blue-secondary/80",
        success:
          "border-transparent bg-ui-success text-white hover:bg-ui-success/80",
        warning:
          "border-transparent bg-ui-warning text-slate-900 hover:bg-ui-warning/80",
        error:
          "border-transparent bg-ui-error text-white hover:bg-ui-error/80",
        destructive:
          "border-transparent bg-ui-error text-white hover:bg-ui-error/80",
        purple:
          "border-transparent bg-ui-purple-primary text-white hover:bg-ui-purple-primary/80",
        purpleSecondary:
          "border-transparent bg-ui-purple-secondary text-slate-900 hover:bg-ui-purple-secondary/80",
        info:
          "border-transparent bg-ui-info text-white hover:bg-ui-info/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={`${badgeVariants({ variant })} ${className || ''}`} {...props} />
  )
}

export { Badge, badgeVariants }
