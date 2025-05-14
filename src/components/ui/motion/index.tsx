
// This file provides backward compatibility with components that still expect motion components
// Eventually these should all be replaced with Tailwind animations

import React from 'react';

interface FallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

// Simplified fallback components that just render children with some basic animations
export const FadeIn: React.FC<FallbackProps> = ({ children, className, ...props }) => (
  <div className={`animate-fade-in ${className || ''}`} {...props}>
    {children}
  </div>
);

export const FadeUp: React.FC<FallbackProps> = ({ children, className, ...props }) => (
  <div 
    className={`animate-fade-in translate-y-0 opacity-100 transition-all duration-500 ${className || ''}`} 
    style={{ transform: 'translateY(0)', opacity: 1 }}
    {...props}
  >
    {children}
  </div>
);

export const SlideIn: React.FC<FallbackProps> = ({ children, className, ...props }) => (
  <div className={`animate-slide-in-right ${className || ''}`} {...props}>
    {children}
  </div>
);

export const ScaleIn: React.FC<FallbackProps> = ({ children, className, ...props }) => (
  <div 
    className={`scale-100 opacity-100 transition-all duration-300 ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

export const StaggerContainer: React.FC<FallbackProps> = ({ children, className, ...props }) => (
  <div className={className || ''} {...props}>
    {children}
  </div>
);

export const StaggerItem: React.FC<FallbackProps> = ({ children, className, ...props }) => (
  <div 
    className={`animate-fade-in ${className || ''}`} 
    {...props}
  >
    {children}
  </div>
);

export const MotionDiv: React.FC<FallbackProps> = ({ children, className, ...props }) => (
  <div className={className || ''} {...props}>
    {children}
  </div>
);

export const MotionButton: React.FC<ButtonProps> = ({ 
  children, 
  className,
  ...props 
}) => (
  <button 
    className={`transition-all duration-200 hover:scale-105 active:scale-95 ${className || ''}`}
    {...props}
  >
    {children}
  </button>
);

export const MotionImage: React.FC<ImageProps> = ({ 
  src,
  alt,
  className,
  containerClassName,
  loadingComponent,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  return (
    <div className={containerClassName}>
      {!isLoaded && loadingComponent}
      <img
        src={src}
        alt={alt || ""}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
};

export const MotionList: React.FC<ListProps> = ({ 
  children,
  className,
  ...props
}) => (
  <ul className={className || ''} {...props}>
    {React.Children.map(children, (child, index) => (
      <li 
        className="animate-fade-in" 
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {child}
      </li>
    ))}
  </ul>
);

// Types to maintain compatibility
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  loadingComponent?: React.ReactNode;
}

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  staggerDelay?: number;
}

export type MotionDivProps = FallbackProps;
export type MotionButtonProps = ButtonProps;
export type MotionImageProps = ImageProps;
export type MotionListProps = ListProps;
