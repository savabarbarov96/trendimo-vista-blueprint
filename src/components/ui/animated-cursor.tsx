
import React, { useState, useEffect } from 'react';
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
  const { shouldAnimate } = useAnimationSettings() ?? { shouldAnimate: false };
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
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-300`}
        style={{
          backgroundColor: 'transparent',
          border: `2px solid ${color}`,
          height: outerSize,
          width: outerSize,
          transform: `translate3d(${mousePosition.x - outerSize / 2}px, ${mousePosition.y - outerSize / 2}px, 0) scale(${isPointer ? outerScale : isClicked ? clickScale : 1})`,
        }}
      />
      
      {/* Small inner cursor (dot) */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-transform duration-300"
        style={{
          backgroundColor: color,
          height: innerSize,
          width: innerSize,
          transform: `translate3d(${mousePosition.x - innerSize / 2}px, ${mousePosition.y - innerSize / 2}px, 0) scale(${isClicked ? innerScale : 1})`,
        }}
      />
    </>
  );
}

export default AnimatedCursor;
