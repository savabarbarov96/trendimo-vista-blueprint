
import * as React from "react";
import { motion, type MotionProps } from "framer-motion";
import { useAnimationSettings } from "@/lib/animations/motion";

// Animated list component
export interface MotionListProps extends React.HTMLAttributes<HTMLUListElement> {
  staggerDelay?: number;
}

export const MotionList = React.forwardRef<HTMLUListElement, MotionListProps>(
  ({ staggerDelay = 0.1, className, children, ...props }, ref) => {
    const { shouldAnimate } = useAnimationSettings();
    
    if (!shouldAnimate) {
      return (
        <ul ref={ref} className={className} {...props}>
          {children}
        </ul>
      );
    }

    const staggerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    };

    // Filter out problematic props which cause type errors
    const { 
      onDrag, 
      onDragStart, 
      onDragEnd, 
      onAnimationStart, 
      onAnimationComplete,
      ...filteredProps 
    } = props;

    const motionProps: MotionProps = {
      initial: "hidden",
      animate: "visible",
      variants: staggerVariants,
    };

    // Make sure children is a valid React Node
    const safeChildren = React.Children.toArray(children);

    return (
      <motion.ul
        ref={ref}
        className={className}
        {...motionProps}
        {...filteredProps}
      >
        {safeChildren.map((child, index) => {
          if (!React.isValidElement(child)) return child;
          
          return (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {child}
            </motion.li>
          );
        })}
      </motion.ul>
    );
  }
);

MotionList.displayName = "MotionList";
