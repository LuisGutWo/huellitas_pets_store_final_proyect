import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  variant?: 'text' | 'circle' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | false;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  width, 
  height, 
  variant = 'text',
  animation = 'wave',
  className = ''
}) => {
  const variantClass = {
    text: 'skeleton skeleton--text',
    circle: 'skeleton skeleton--circle',
    rectangular: 'skeleton',
    rounded: 'skeleton'
  }[variant];

  const animationClass = animation === 'pulse' ? 'skeleton--pulse' : '';
  
  // Use width/height as className modifiers if provided
  const sizeClass = width || height ? 'skeleton--custom-size' : '';
  
  // Create a ref to set CSS variables after mount
  const ref = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (ref.current) {
      if (width) ref.current.style.setProperty('--skeleton-width', width);
      if (height) ref.current.style.setProperty('--skeleton-height', height);
    }
  }, [width, height]);

  return (
    <div 
      ref={ref}
      className={`${variantClass} ${animationClass} ${sizeClass} ${className}`.trim()}
      aria-busy="true"
      aria-label="Cargando contenido"
    />
  );
};

export default Skeleton;
