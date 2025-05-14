
import { useReducedMotion } from "framer-motion";
import type { Variant, Variants } from "framer-motion";

// Default fade variants
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

// Default slide-up fade variants
export const fadeUpVariants: Variants = {
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
  }
};

// Default slide-in variants
export const slideVariants: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    x: 30, 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

// Scale variants
export const scaleVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.4 }
  },
  exit: { 
    scale: 0.95, 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

// Stagger children variants
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Item variants for staggering
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Hover animations for buttons and interactive elements
export const hoverVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } }
};

// Hook to check if user prefers reduced motion
export const useAnimationSettings = () => {
  const prefersReducedMotion = useReducedMotion();

  return {
    // If user prefers reduced motion, provide very subtle or no animations
    fadeVariants: prefersReducedMotion ? {
      hidden: { opacity: 0.95 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0.95, transition: { duration: 0.2 } }
    } : fadeVariants,
    
    fadeUpVariants: prefersReducedMotion ? {
      hidden: { opacity: 0.95 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0.95, transition: { duration: 0.2 } }
    } : fadeUpVariants,
    
    slideVariants: prefersReducedMotion ? {
      hidden: { opacity: 0.9 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0.9, transition: { duration: 0.2 } }
    } : slideVariants,
    
    scaleVariants: prefersReducedMotion ? {
      hidden: { opacity: 0.9 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0.9, transition: { duration: 0.2 } }
    } : scaleVariants,
    
    staggerContainerVariants,
    staggerItemVariants,
    hoverVariants: prefersReducedMotion ? {} : hoverVariants,
    
    // Flag to disable animations completely
    shouldAnimate: !prefersReducedMotion
  };
};
