
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAnimationSettings } from "@/lib/animations/motion";

interface AnimatedSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  animated?: boolean;
}

export function AnimatedSkeleton({
  className,
  count = 1,
  animated = true,
  ...props
}: AnimatedSkeletonProps) {
  const { shouldAnimate } = useAnimationSettings();
  
  // If animations are disabled or animated prop is false, use static skeleton
  if (!shouldAnimate || !animated) {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn("animate-pulse rounded-md bg-muted", className)}
            {...props}
          />
        ))}
      </>
    );
  }
  
  // Shimmer effect animation
  const shimmerVariants = {
    initial: {
      backgroundPosition: "-500px 0",
    },
    animate: {
      backgroundPosition: "calc(500px + 100%) 0",
      transition: {
        repeat: Infinity,
        repeatType: "mirror" as const,
        duration: 2,
      },
    },
  };
  
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            "rounded-md bg-muted relative overflow-hidden",
            className
          )}
          initial="initial"
          animate="animate"
          variants={shimmerVariants}
          style={{
            backgroundImage: 
              "linear-gradient(90deg, var(--skeleton-from, rgba(0,0,0,0.05)), var(--skeleton-to, rgba(0,0,0,0.1)), var(--skeleton-from, rgba(0,0,0,0.05)))",
            backgroundSize: "500px 100%"
          }}
          // Remove any event handlers that might conflict with MotionProps
          onDrag={undefined}
          {...props}
        />
      ))}
    </>
  );
}

export default AnimatedSkeleton;
