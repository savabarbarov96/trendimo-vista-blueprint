
import * as React from "react";
import { cn } from "@/lib/utils";
import { useAnimationSettings } from "@/lib/animations/motion";
import { MotionDiv, type MotionDivProps } from "./motion-div";
import { motion, type MotionProps } from "framer-motion";

// Interactive button wrapper that adds hover and tap animations
export type MotionButtonProps = Omit<MotionDivProps, 'whileHover' | 'whileTap'> & {
  interactive?: boolean;
};

export const MotionButton = React.forwardRef<HTMLDivElement, MotionButtonProps>(
  ({ interactive = true, className, ...props }, ref) => {
    const { shouldAnimate } = useAnimationSettings();
    
    if (!shouldAnimate || !interactive) {
      return <MotionDiv ref={ref} className={className} {...props} />;
    }
    
    // Strip out React event handlers that conflict with framer-motion
    const {
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      onDrag, 
      onDragStart, 
      onDragEnd,
      ...filteredProps 
    } = props;
    
    // Use proper type casting to avoid TypeScript errors with motion props
    const motionProps: MotionProps = {
      whileHover: { scale: 1.05, transition: { duration: 0.2 } },
      whileTap: { scale: 0.98, transition: { duration: 0.1 } },
      ...filteredProps as any // Cast to any to avoid TypeScript errors
    };
    
    return (
      <motion.div
        ref={ref}
        className={cn("transition-transform", className)}
        {...motionProps}
      />
    );
  }
);

MotionButton.displayName = "MotionButton";
