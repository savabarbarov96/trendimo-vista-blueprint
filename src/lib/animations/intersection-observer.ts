
import { useEffect, useState, useRef } from 'react';
import { useAnimationSettings } from './motion';

// Interface for custom IntersectionObserver hook options
interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Custom hook for intersection observer to trigger animations when elements enter viewport
export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const { shouldAnimate } = useAnimationSettings();

  useEffect(() => {
    const currentRef = ref.current;
    
    // If animations are disabled, consider everything as visible
    if (!shouldAnimate) {
      setIsIntersecting(true);
      return;
    }
    
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        // If triggerOnce is true and element has already been triggered, don't update state
        if (triggerOnce && hasTriggered) return;
        
        setIsIntersecting(isElementIntersecting);
        
        // If element is intersecting and triggerOnce is true, set hasTriggered to true
        if (isElementIntersecting && triggerOnce) {
          setHasTriggered(true);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin, threshold, triggerOnce, hasTriggered, shouldAnimate]);
  
  return { ref, isIntersecting };
}

// Hook for staggered animations on multiple elements
export function useStaggeredIntersection(itemCount: number, options?: UseIntersectionObserverOptions) {
  const { ref, isIntersecting } = useIntersectionObserver(options);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  
  useEffect(() => {
    if (isIntersecting && visibleItems.length === 0) {
      // Create new array with false values
      const initialArray = Array(itemCount).fill(false);
      
      // Sequentially set items to true with delay
      let timeoutIds: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timeoutId = setTimeout(() => {
          setVisibleItems(prev => {
            const newArr = [...prev];
            newArr[i] = true;
            return newArr;
          });
        }, i * 100); // 100ms stagger
        
        timeoutIds.push(timeoutId);
      }
      
      return () => {
        timeoutIds.forEach(id => clearTimeout(id));
      };
    } else if (!isIntersecting && options?.triggerOnce !== true) {
      setVisibleItems([]);
    }
  }, [isIntersecting, itemCount, options?.triggerOnce]);
  
  return { ref, visibleItems, isIntersecting };
}
