
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimationSettings } from '@/lib/animations/motion';

// Create a motion button component by wrapping Button with motion
export const MotionButtonBase = motion(Button);

export interface MotionButtonProps extends Omit<ButtonProps, 'children'> {
  animate?: boolean;
  staggerItem?: boolean | number;
  variants?: any;
  children?: React.ReactNode;
  whileHover?: any;
  whileTap?: any;
  initial?: any;
  exit?: any;
}

export function MotionButton({
  animate = true,
  staggerItem,
  className,
  variants,
  children,
  ...props
}: MotionButtonProps) {
  const { fadeUpVariants, hoverVariants, shouldAnimate } = useAnimationSettings();
  
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
      <Button className={cn(className)} {...restProps}>
        {children}
      </Button>
    );
  }

  // Define motion props to avoid type conflicts
  const motionProps = {
    variants: variants || fadeUpVariants,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    whileHover: 'hover',
    whileTap: 'tap',
  };

  // Only add custom variants if staggerItem is true
  if (staggerItem) {
    motionProps.variants = {
      ...motionProps.variants,
      visible: {
        ...motionProps.variants.visible,
        transition: {
          ...motionProps.variants.visible?.transition,
          delay: 0.1 * Number(staggerItem),
        },
      },
    };
  }

  return (
    <MotionButtonBase
      className={cn(className)}
      {...restProps}
      {...motionProps}
    >
      {children}
    </MotionButtonBase>
  );
}
