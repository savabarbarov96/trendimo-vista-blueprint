
import * as React from "react";
import { MotionDiv, type MotionDivProps } from "./motion-div";

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
