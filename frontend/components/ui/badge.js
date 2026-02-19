import * as React from "react"
import { cn } from "../../lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
    const variants = {
        default: "bg-[#1A73E8] text-white hover:bg-[#1557B0]",
        secondary: "bg-[#E8F0FE] text-[#1967D2] border-transparent",
        destructive: "bg-[#FCE8E6] text-[#C5221F] border-transparent",
        outline: "text-[#202124] border border-[#DADCE0]",
        success: "bg-[#E6F4EA] text-[#137333] border-transparent",
        warning: "bg-[#FFF8E1] text-[#F57F17] border-transparent",
    }

    return (
        <div
            ref={ref}
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    )
})
Badge.displayName = "Badge"

export { Badge }
