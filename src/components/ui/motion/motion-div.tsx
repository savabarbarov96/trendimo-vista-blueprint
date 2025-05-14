
import * as React from "react";
import { motion, type Variants, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAnimationSettings } from "@/lib/animations/motion";
import { useIntersectionObserver } from "@/lib/animations/intersection-observer";

export type MotionDivProps = Omit<React.HTMLAttributes<HTMLDivElement>, "animate" | "initial" | "exit" | "transition" | "variants"> & {
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
    // Get animation variants based on user preferences with safe destructuring
    const { 
      fadeVariants = {}, 
      fadeUpVariants = {}, 
      slideVariants = {}, 
      scaleVariants = {},
      staggerContainerVariants = {},
      staggerItemVariants = {},
      shouldAnimate = true
    } = useAnimationSettings() ?? {};
    
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
    
    // Strip out React event handlers that conflict with Framer Motion
    const {
      onAnimationStart,
      onDrag, 
      onDragStart, 
      onDragEnd,
      onAnimationEnd,
      onAnimationIteration,
      ...htmlProps
    } = props;
    
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
      
      return (
        <motion.div
          ref={mergedRef}
          className={className}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          exit="exit"
          variants={selectedVariant}
          transition={customTransition}
          {...htmlProps as unknown as MotionProps}
        >
          {children}
        </motion.div>
      );
    }
    
    // Direct animation without intersection observer
    return (
      <motion.div
        ref={forwardedRef}
        className={className}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={selectedVariant}
        transition={customTransition}
        {...htmlProps as unknown as MotionProps}
      >
        {children}
      </motion.div>
    );
  }
);

MotionDiv.displayName = "MotionDiv";
