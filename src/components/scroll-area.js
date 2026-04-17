import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
const ScrollArea = React.forwardRef(({ className, children, hideScrollbar = false, ...props }, ref) => (_jsxs(ScrollAreaPrimitive.Root, { ref: ref, className: cn("relative overflow-hidden", className), ...props, children: [_jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children: children }), !hideScrollbar && _jsx(ScrollBar, {}), _jsx(ScrollAreaPrimitive.Corner, {})] })));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => (_jsx(ScrollAreaPrimitive.ScrollAreaScrollbar, { ref: ref, orientation: orientation, className: cn("flex touch-none select-none transition-colors duration-300", orientation === "vertical" &&
        "h-full w-2 border-l border-l-transparent p-[1px] hover:w-2.5", orientation === "horizontal" &&
        "h-2 flex-col border-t border-t-transparent p-[1px] hover:h-2.5", className), ...props, children: _jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border/50 hover:bg-border/80 transition-colors" }) })));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
export { ScrollArea, ScrollBar };
