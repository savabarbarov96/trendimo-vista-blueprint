
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAnimationSettings } from "@/lib/animations/motion";

// Image component with lazy loading and fade-in
export interface MotionImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  loadingComponent?: React.ReactNode;
}

export const MotionImage = React.forwardRef<HTMLImageElement, MotionImageProps>(
  ({ containerClassName, className, loadingComponent, src, alt, ...props }, ref) => {
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
            src={src}
            alt={alt}
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
          src={src}
          alt={alt}
          className={className}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeVariants}
          onLoad={handleImageLoad}
          onDrag={undefined} // Fix TypeScript error
          {...props}
        />
      </div>
    );
  }
);

MotionImage.displayName = "MotionImage";
