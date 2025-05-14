
import * as React from "react";
import { cn } from "@/lib/utils";
import { useAnimationSettings } from "@/lib/animations/motion";
import { MotionDiv, type MotionDivProps } from "./motion-div";
import { motion } from "framer-motion";

// Interactive button wrapper that adds hover and tap animations
export type MotionButtonProps = MotionDivProps & {
  interactive?: boolean;
};

export const MotionButton = React.forwardRef<HTMLDivElement, MotionButtonProps>(
  ({ interactive = true, className, ...props }, ref) => {
    const { shouldAnimate } = useAnimationSettings();
    
    if (!shouldAnimate || !interactive) {
      return <MotionDiv ref={ref} className={className} {...props} />;
    }
    
    // Filter out props that cause type errors
    const { 
      onDrag, 
      onDragStart, 
      onDragEnd, 
      onAnimationStart, 
      onAnimationComplete,
      whileHover, // Remove these from props to avoid duplicates
      whileTap,
      ...filteredProps 
    } = props;
    
    return (
      <motion.div
        ref={ref}
        className={cn("transition-transform", className)}
        // Apply hover and tap animations directly
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        {...filteredProps as any}
      />
    );
  }
);

MotionButton.displayName = "MotionButton";
