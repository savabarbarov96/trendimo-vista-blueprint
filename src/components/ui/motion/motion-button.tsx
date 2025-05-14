
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUpVariants } from './motion-variants';

// Create a motion button component by wrapping Button with motion
const MotionButton = motion(Button);

export interface MotionButtonProps extends ButtonProps, MotionProps {
  animate?: boolean;
  staggerItem?: boolean;
}

export function MotionizedButton({
  animate = true,
  staggerItem,
  className,
  variants,
  children,
  ...props
}: MotionButtonProps) {
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
  if (!animate) {
    return (
      <Button className={cn(className)} {...restProps}>
        {children}
      </Button>
    );
  }

  // Define motion props separately to avoid type conflicts
  const motionProps: any = {
    variants: variants || fadeUpVariants,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
    whileHover: 'hover',
    whileTap: 'tap',
  };

  // Only add custom variants if staggerItem is true
  if (staggerItem) {
    motionProps.variants = {
      ...motionProps.variants,
      animate: {
        ...motionProps.variants.animate,
        transition: {
          ...motionProps.variants.animate?.transition,
          delay: 0.1 * Number(staggerItem),
        },
      },
    };
  }

  return (
    <MotionButton
      className={cn(className)}
      {...restProps}
      {...motionProps}
    >
      {children}
    </MotionButton>
  );
}
