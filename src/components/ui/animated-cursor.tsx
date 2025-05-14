
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimationSettings } from '@/lib/animations/motion';

interface AnimatedCursorProps {
  color?: string;
  outerSize?: number;
  innerSize?: number;
  outerScale?: number;
  innerScale?: number;
  trailingSpeed?: number;
  clickScale?: number;
}

export function AnimatedCursor({
  color = '#8B5CF6',
  outerSize = 34,
  innerSize = 8,
  outerScale = 1.5,
  innerScale = 0.6,
  trailingSpeed = 0.2,
  clickScale = 0.8
}: AnimatedCursorProps) {
  const { shouldAnimate } = useAnimationSettings();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  // Don't render the cursor if user prefers reduced motion
  if (!shouldAnimate) {
    return null;
  }
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over clickable element
      const target = e.target as HTMLElement;
      const computed = window.getComputedStyle(target);
      setIsPointer(computed.cursor === 'pointer');
    };
    
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  return (
    <>
      {/* Large outer cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 rounded-full mix-blend-difference"
        style={{
          backgroundColor: 'transparent',
          border: `2px solid ${color}`,
          height: outerSize,
          width: outerSize,
        }}
        animate={{
          scale: isPointer ? outerScale : isClicked ? clickScale : 1,
          x: mousePosition.x - outerSize / 2,
          y: mousePosition.y - outerSize / 2,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />
      
      {/* Small inner cursor (dot) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-50 rounded-full"
        style={{
          backgroundColor: color,
          height: innerSize,
          width: innerSize,
        }}
        animate={{
          scale: isClicked ? innerScale : 1,
          x: mousePosition.x - innerSize / 2,
          y: mousePosition.y - innerSize / 2,
        }}
        transition={{
          type: "spring",
          damping: 60,
          stiffness: 1000,
        }}
      />
    </>
  );
}

export default AnimatedCursor;
