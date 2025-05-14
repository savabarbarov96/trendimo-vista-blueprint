
import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { motion, type MotionProps, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimationSettings } from '@/lib/animations/motion';

// Create a motion button component by wrapping Button with motion
export const MotionButtonBase = motion(Button);

// Define a comprehensive type for the motion button props
export interface MotionButtonProps extends Omit<ButtonProps, 'children'> {
  animate?: boolean;
  staggerItem?: boolean | number;
  variants?: Variants; // Use the correct Variants type from framer-motion
  children?: React.ReactNode;
  whileHover?: MotionProps['whileHover'];
  whileTap?: MotionProps['whileTap'];
  initial?: MotionProps['initial'];
  exit?: MotionProps['exit'];
}

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ animate = true, staggerItem, className, variants, children, ...props }, ref) => {
    const { fadeUpVariants = {}, shouldAnimate = true } = useAnimationSettings() ?? {};
    
    // Strip out React event handlers that conflict with framer-motion
    const {
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      onDrag, 
      onDragEnd, 
      onDragStart,
      ...restProps
    } = props;

    // If animation is disabled, just render a regular button
    if (!shouldAnimate || !animate) {
      return (
        <Button className={cn(className)} ref={ref} {...restProps}>
          {children}
        </Button>
      );
    }

    // Define motion props with proper typing
    const motionProps: Partial<MotionProps> = {
      variants: variants || (fadeUpVariants as Variants),
      initial: 'hidden',
      animate: 'visible',
      exit: 'exit',
      whileHover: 'hover',
      whileTap: 'tap',
    };

    // Only add custom variants if staggerItem is true
    if (staggerItem && typeof staggerItem !== 'boolean') {
      const delay = typeof staggerItem === 'number' ? staggerItem * 0.1 : 0.1;
      motionProps.variants = {
        ...motionProps.variants,
        visible: {
          ...(motionProps.variants as any)?.visible,
          transition: {
            ...((motionProps.variants as any)?.visible?.transition || {}),
            delay,
          },
        },
      };
    }

    return (
      <MotionButtonBase
        className={cn(className)}
        ref={ref}
        {...restProps}
        {...motionProps as any}
      >
        {children}
      </MotionButtonBase>
    );
  }
);

MotionButton.displayName = 'MotionButton';
