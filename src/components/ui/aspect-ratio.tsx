
import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Regular AspectRatio component from Radix UI
const AspectRatio = AspectRatioPrimitive.Root;

// Motion-enhanced AspectRatio component for animations
interface MotionAspectRatioProps extends HTMLMotionProps<"div"> {
  ratio?: number;
}

const MotionAspectRatio = React.forwardRef<
  HTMLDivElement, 
  MotionAspectRatioProps
>(({
  ratio = 16 / 9,
  className,
  children,
  ...props
}, ref) => (
  <div className={cn("relative w-full", className)}>
    <div style={{ paddingBottom: `${100 / ratio}%` }} />
    <motion.div
      ref={ref}
      className="absolute inset-0"
      {...props}
    >
      {children}
    </motion.div>
  </div>
));

MotionAspectRatio.displayName = "MotionAspectRatio";

export { AspectRatio, MotionAspectRatio };
