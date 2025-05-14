
import * as React from "react";
import { motion } from "framer-motion";
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

    // Filter out onDrag prop which causes type errors
    const { onDrag, ...filteredProps } = props;

    return (
      <motion.ul
        ref={ref}
        className={className}
        initial="hidden"
        animate="visible"
        variants={staggerVariants}
        {...filteredProps}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          
          return (
            <motion.li
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
