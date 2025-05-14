
import * as React from "react";
import { motion, type HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAnimationSettings } from "@/lib/animations/motion";
import { useIntersectionObserver } from "@/lib/animations/intersection-observer";

export type MotionDivProps = HTMLMotionProps<"div"> & {
  variant?: "fade" | "fadeUp" | "slide" | "scale" | "none";
  animate?: boolean;
  triggerOnce?: boolean;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
  staggerContainer?: boolean;
  staggerItem?: boolean;
};

export const MotionDiv = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (
    {
      variant = "fade",
      animate = true,
      triggerOnce = true,
      threshold = 0.1,
      rootMargin = "0px",
      delay = 0,
      duration,
      staggerContainer = false,
      staggerItem = false,
      className,
      children,
      ...props
    },
    forwardedRef
  ) => {
    // Get animation variants based on user preferences
    const { 
      fadeVariants, 
      fadeUpVariants, 
      slideVariants, 
      scaleVariants,
      staggerContainerVariants,
      staggerItemVariants,
      shouldAnimate
    } = useAnimationSettings();
    
    // If animations should be disabled based on user preferences
    if (!shouldAnimate || variant === "none") {
      return (
        <div ref={forwardedRef} className={className} {...props}>
          {children}
        </div>
      );
    }
    
    // Determine which variant to use
    let selectedVariant: Variants;
    if (staggerContainer) {
      selectedVariant = staggerContainerVariants;
    } else if (staggerItem) {
      selectedVariant = staggerItemVariants;
    } else {
      switch (variant) {
        case "fadeUp":
          selectedVariant = fadeUpVariants;
          break;
        case "slide":
          selectedVariant = slideVariants;
          break;
        case "scale":
          selectedVariant = scaleVariants;
          break;
        case "fade":
        default:
          selectedVariant = fadeVariants;
      }
    }
    
    // Custom transition based on props
    const customTransition = {
      delay,
      ...(duration ? { duration } : {})
    };
    
    // If animation should be triggered by intersection
    if (animate) {
      const { ref, isIntersecting } = useIntersectionObserver({
        threshold,
        rootMargin,
        triggerOnce
      });
      
      // Create a merged ref that combines the intersection observer ref
      // with any forwarded ref from the parent
      const mergedRef = (node: HTMLDivElement | null) => {
        // Assign to the intersection observer ref
        if (node) {
          ref.current = node;
          
          // Also assign to any forwarded ref
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }
      };
      
      // Filter out onDrag prop which causes type errors with framer-motion
      const { onDrag, ...filteredProps } = props;
      
      return (
        <motion.div
          ref={mergedRef}
          className={className}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          exit="exit"
          variants={selectedVariant}
          transition={customTransition}
          {...filteredProps}
        >
          {children}
        </motion.div>
      );
    }
    
    // Direct animation without intersection observer
    // Filter out onDrag prop which causes type errors
    const { onDrag, ...filteredProps } = props;
    
    return (
      <motion.div
        ref={forwardedRef}
        className={className}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={selectedVariant}
        transition={customTransition}
        {...filteredProps}
      >
        {children}
      </motion.div>
    );
  }
);

MotionDiv.displayName = "MotionDiv";
