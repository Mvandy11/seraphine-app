import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
function Skeleton({ className, animated = true, ...props }) {
    return (_jsx("div", { className: cn("rounded-md bg-muted/70", animated && "animate-pulse", className), ...props }));
}
export { Skeleton };
