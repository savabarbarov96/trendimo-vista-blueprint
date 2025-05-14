
import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { Variants } from "framer-motion";

// Define a default animation settings context
export interface MotionContextType {
  shouldAnimate: boolean;
  fadeVariants: Variants;
  fadeUpVariants: Variants;
  slideVariants: Variants;
  scaleVariants: Variants;
  hoverVariants: Record<string, unknown>;
  tapVariants: Record<string, unknown>;
  staggerContainerVariants: Variants;
  staggerItemVariants: Variants;
}

// Create default animation settings
const defaultAnimationSettings: MotionContextType = {
  shouldAnimate: true,
  
  fadeVariants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  },
  
  fadeUpVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
  },
  
  slideVariants: {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: 20, opacity: 0, transition: { duration: 0.3 } }
  },
  
  scaleVariants: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } }
  },
  
  hoverVariants: { scale: 1.05, transition: { duration: 0.2 } },
  
  tapVariants: { scale: 0.95, transition: { duration: 0.1 } },
  
  staggerContainerVariants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  },
  
  staggerItemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
};

const MotionContext = createContext<MotionContextType>(defaultAnimationSettings);

export const useAnimationSettings = (): MotionContextType => {
  const context = useContext(MotionContext);
  // Guard against null context with nullish coalescing
  return context ?? defaultAnimationSettings;
};

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings] = useState<MotionContextType>(defaultAnimationSettings);
  
  return (
    <LazyMotion features={domAnimation}>
      <MotionContext.Provider value={settings}>
        <MotionConfig reducedMotion="user">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </MotionConfig>
      </MotionContext.Provider>
    </LazyMotion>
  );
};
