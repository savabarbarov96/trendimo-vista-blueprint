
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
    
    // Filter out onDrag prop which causes type errors
    const { onDrag, ...filteredProps } = props;
    
    return (
      <MotionDiv
        ref={ref}
        className={cn("transition-transform", className)}
        whileHover="hover"
        whileTap="tap"
        variants={hoverVariants}
        {...filteredProps}
      />
    );
  }
);

MotionButton.displayName = "MotionButton";
