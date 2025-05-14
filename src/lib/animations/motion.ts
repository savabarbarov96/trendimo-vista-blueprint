
import { useReducer } from 'react';

// Define animation variants with proper typings
export interface MotionVariants {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
  exit?: Record<string, unknown>;
  hover?: Record<string, unknown>;
  tap?: Record<string, unknown>;
}

// Define animation settings
interface AnimationSettings {
  shouldAnimate: boolean;
  fadeVariants: MotionVariants;
  fadeUpVariants: MotionVariants;
  slideVariants: MotionVariants;
  scaleVariants: MotionVariants;
  hoverVariants: Record<string, unknown>;
  tapVariants: Record<string, unknown>;
  staggerContainer: Record<string, unknown>;
  staggerItem: Record<string, unknown>;
}

// Use a default animation settings object with proper typing
export function useAnimationSettings(): AnimationSettings {
  // Use useReducer as a trick to memoize this object
  const [settings] = useReducer(() => ({
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
    
    staggerContainer: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.1 } }
    },
    
    staggerItem: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }
  }), null);
  
  return settings;
}
