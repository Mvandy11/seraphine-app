import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
const Progress = React.forwardRef(({ className, value, variant = "default", ...props }, ref) => (_jsx(ProgressPrimitive.Root, { ref: ref, className: cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary/40", className), ...props, children: _jsx(ProgressPrimitive.Indicator, { className: cn("h-full w-full flex-1 transition-all duration-300 ease-in-out", variant === "default" && "bg-primary", variant === "success" && "bg-green-500", variant === "warning" && "bg-yellow-500", variant === "error" && "bg-destructive"), style: { transform: `translateX(-${100 - (value || 0)}%)` } }) })));
Progress.displayName = ProgressPrimitive.Root.displayName;
export { Progress };
