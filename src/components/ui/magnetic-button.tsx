
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimationSettings } from '@/lib/animations/motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
  radius?: number;
  children: React.ReactNode;
}

export function MagneticButton({
  strength = 30,
  radius = 600,
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useAnimationSettings();
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shouldAnimate || !buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    const distance = Math.sqrt(x * x + y * y);
    
    // Only apply magnetic effect within the defined radius
    if (distance < radius) {
      // Calculate strength based on distance (stronger when closer)
      const magneticStrength = strength * (1 - distance / radius);
      setPosition({ 
        x: x * (magneticStrength / 50), 
        y: y * (magneticStrength / 50) 
      });
    } else {
      // Reset position when outside radius
      setPosition({ x: 0, y: 0 });
    }
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  // If animations are disabled, render regular button
  if (!shouldAnimate) {
    return (
      <button 
        className={className} 
        {...props}
      >
        {children}
      </button>
    );
  }
  
  // Filter out onDrag prop which causes type errors
  const { onDrag, ...filteredProps } = props;
  
  return (
    <div 
      ref={buttonRef}
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        className={cn("transition-colors", className)}
        animate={{ x: position.x, y: position.y }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 15,
          mass: 0.1
        }}
        whileTap={{ scale: 0.98 }}
        {...filteredProps}
      >
        {children}
      </motion.button>
    </div>
  );
}

export default MagneticButton;
