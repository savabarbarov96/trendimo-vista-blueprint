
import * as React from "react";
import { MotionDiv, type MotionDivProps } from "./motion-div";

// Common animation variants that are exported and used by other components
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } }
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: { duration: 0.3 }
  },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } }
};

// Pre-configured variants for common use cases
export const FadeIn = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv variant="fade" ref={ref} {...props} />
);
FadeIn.displayName = "FadeIn";

export const FadeUp = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv variant="fadeUp" ref={ref} {...props} />
);
FadeUp.displayName = "FadeUp";

export const SlideIn = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv variant="slide" ref={ref} {...props} />
);
SlideIn.displayName = "SlideIn";

export const ScaleIn = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv variant="scale" ref={ref} {...props} />
);
ScaleIn.displayName = "ScaleIn";

export const StaggerContainer = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv staggerContainer ref={ref} {...props} />
);
StaggerContainer.displayName = "StaggerContainer";

export const StaggerItem = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => <MotionDiv staggerItem ref={ref} {...props} />
);
StaggerItem.displayName = "StaggerItem";
