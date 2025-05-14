
import * as React from "react";
import { motion, type MotionProps, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAnimationSettings } from "@/lib/animations/motion";

// Image component with lazy loading and fade-in
export interface MotionImageProps extends Omit<HTMLMotionProps<"img">, "onLoad"> {
  containerClassName?: string;
  loadingComponent?: React.ReactNode;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
}

export const MotionImage = React.forwardRef<HTMLImageElement, MotionImageProps>(
  ({ containerClassName, className, loadingComponent, src, alt, onLoad, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const { fadeVariants, shouldAnimate } = useAnimationSettings();
    
    const handleImageLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
      setIsLoaded(true);
      if (onLoad) {
        onLoad(e);
      }
    };
    
    if (!shouldAnimate) {
      return (
        <div className={containerClassName}>
          <img 
            ref={ref}
            src={src}
            alt={alt}
            className={className} 
            {...props} 
          />
        </div>
      );
    }
    
    // Filter out onDrag prop which causes type errors
    const { onDrag, onAnimationStart, ...filteredProps } = props;
    
    const motionProps: MotionProps = {
      initial: "hidden",
      animate: isLoaded ? "visible" : "hidden",
      variants: fadeVariants,
    };
    
    return (
      <div className={cn("relative overflow-hidden", containerClassName)}>
        {!isLoaded && loadingComponent}
        <motion.img
          ref={ref}
          src={src}
          alt={alt}
          className={className}
          onLoad={handleImageLoad}
          {...motionProps}
          {...filteredProps as any}
        />
      </div>
    );
  }
);

MotionImage.displayName = "MotionImage";
