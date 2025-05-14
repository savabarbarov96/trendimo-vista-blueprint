
import * as React from "react";
import { cn } from "@/lib/utils";
import { useAnimationSettings } from "@/lib/animations/motion";
import { MotionDiv, type MotionDivProps } from "./motion-div";

// Interactive button wrapper that adds hover and tap animations
export type MotionButtonProps = MotionDivProps & {
  interactive?: boolean;
};

export const MotionButton = React.forwardRef<HTMLDivElement, MotionButtonProps>(
  ({ interactive = true, className, ...props }, ref) => {
    const { hoverVariants, shouldAnimate } = useAnimationSettings();
    
    if (!shouldAnimate || !interactive) {
      return <MotionDiv ref={ref} className={className} {...props} />;
    }
    
    // Filter out props that cause type errors
    const { onDrag, onAnimationStart, ...filteredProps } = props;
    
    return (
      <MotionDiv
        ref={ref}
        className={cn("transition-transform", className)}
        whileHover="hover"
        whileTap="tap"
        variant="none" // Use custom variants instead
        {...filteredProps}
        // Apply hover variants directly instead of using the variants prop
        // which doesn't exist on MotionDiv
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      />
    );
  }
);

MotionButton.displayName = "MotionButton";
