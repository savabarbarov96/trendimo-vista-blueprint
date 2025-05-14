
import * as React from "react";
import { motion, type HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAnimationSettings } from "@/lib/animations/motion";
import { useIntersectionObserver } from "@/lib/animations/intersection-observer";

type MotionDivProps = HTMLMotionProps<"div"> & {
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
      
      return (
        <motion.div
          ref={mergedRef}
          className={className}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          exit="exit"
          variants={selectedVariant}
          transition={customTransition}
          onDrag={undefined}
          {...props}
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
        onDrag={undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionDiv.displayName = "MotionDiv";

// Pre-configured variants for common use cases
export const FadeIn = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv variant="fade" ref={ref} {...props} />
);

export const FadeUp = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv variant="fadeUp" ref={ref} {...props} />
);

export const SlideIn = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv variant="slide" ref={ref} {...props} />
);

export const ScaleIn = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv variant="scale" ref={ref} {...props} />
);

export const StaggerContainer = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv staggerContainer ref={ref} {...props} />
);

export const StaggerItem = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv staggerItem ref={ref} {...props} />
);

// Interactive button wrapper that adds hover and tap animations
type MotionButtonProps = MotionDivProps & {
  interactive?: boolean;
};

export const MotionButton = React.forwardRef<HTMLDivElement, MotionButtonProps>(
  ({ interactive = true, className, ...props }, ref) => {
    const { hoverVariants, shouldAnimate } = useAnimationSettings();
    
    if (!shouldAnimate || !interactive) {
      return <MotionDiv ref={ref} className={className} {...props} />;
    }
    
    return (
      <MotionDiv
        ref={ref}
        className={cn("transition-transform", className)}
        whileHover="hover"
        whileTap="tap"
        variants={hoverVariants}
        onDrag={undefined}
        {...props}
      />
    );
  }
);

MotionButton.displayName = "MotionButton";

// Image component with lazy loading and fade-in
type MotionImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onDrag'> & {
  containerClassName?: string;
  loadingComponent?: React.ReactNode;
};

export const MotionImage = React.forwardRef<HTMLImageElement, MotionImageProps>(
  ({ containerClassName, className, loadingComponent, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const { fadeVariants, shouldAnimate } = useAnimationSettings();
    
    const handleImageLoad = () => {
      setIsLoaded(true);
    };
    
    if (!shouldAnimate) {
      return (
        <div className={containerClassName}>
          <img 
            ref={ref}
            className={className} 
            {...props} 
          />
        </div>
      );
    }
    
    return (
      <div className={cn("relative overflow-hidden", containerClassName)}>
        {!isLoaded && loadingComponent}
        <motion.img
          ref={ref}
          className={className}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeVariants}
          onLoad={handleImageLoad}
          onDrag={undefined}
          {...props}
        />
      </div>
    );
  }
);

MotionImage.displayName = "MotionImage";

// Animated list component
type MotionListProps = Omit<HTMLMotionProps<"ul">, 'onDrag'> & {
  staggerDelay?: number;
  children: React.ReactNode;
};

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

    return (
      <motion.ul
        ref={ref}
        className={className}
        initial="hidden"
        animate="visible"
        variants={staggerVariants}
        {...props}
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
