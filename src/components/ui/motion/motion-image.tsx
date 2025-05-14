
import * as React from "react";
import { motion, type MotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAnimationSettings } from "@/lib/animations/motion";

// Image component with lazy loading and fade-in
export interface MotionImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  loadingComponent?: React.ReactNode;
}

export const MotionImage = React.forwardRef<HTMLImageElement, MotionImageProps>(
  ({ containerClassName, className, loadingComponent, src, alt, onLoad, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const { fadeVariants = {}, shouldAnimate = true } = useAnimationSettings() ?? {};
    
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
            onLoad={handleImageLoad}
            {...props} 
          />
        </div>
      );
    }
    
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
    
    return (
      <div className={cn("relative overflow-hidden", containerClassName)}>
        {!isLoaded && loadingComponent}
        <motion.img
          ref={ref}
          src={src}
          alt={alt || ""}
          className={className}
          onLoad={handleImageLoad}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeVariants as Variants}
          {...htmlProps as unknown as MotionProps}
        />
      </div>
    );
  }
);

MotionImage.displayName = "MotionImage";
