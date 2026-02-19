import { cn } from "../../lib/utils"

function Skeleton({
    className,
    ...props
}) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-[#F1F3F4]", className)}
            {...props}
        />
    )
}

export { Skeleton }
