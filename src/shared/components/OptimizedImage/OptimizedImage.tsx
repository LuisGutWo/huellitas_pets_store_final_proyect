import { useState, useEffect, useRef } from 'react';
import { useWebPSupport, getOptimizedImageSrc } from '../../hooks/useWebPSupport';
import './OptimizedImage.scss';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  aspectRatio?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  placeholderSrc,
  aspectRatio = '1/1',
  loading = 'lazy',
  onLoad,
  onError,
  sizes,
  objectFit = 'cover'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Detectar soporte de WebP y optimizar la imagen
  const supportsWebP = useWebPSupport();
  const optimizedSrc = getOptimizedImageSrc(src, supportsWebP);

  // Intersection Observer para lazy loading manual adicional
  useEffect(() => {
    if (!imgRef.current || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Empezar a cargar 50px antes de que sea visible
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generar base64 placeholder simple (gris claro)
  const defaultPlaceholder = 
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f5f5f5"/%3E%3C/svg%3E';

  const placeholder = placeholderSrc || defaultPlaceholder;

  return (
    <div
      ref={imgRef}
      className={`optimized-image optimized-image--${objectFit} ${className} ${isLoaded ? 'optimized-image--loaded' : ''} ${
        hasError ? 'optimized-image--error' : ''
      }`}
      data-aspect-ratio={aspectRatio}
    >
      {/* Placeholder blur */}
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          className="optimized-image__placeholder"
          aria-hidden="true"
        />
      )}

      {/* Imagen principal */}
      {isInView && !hasError && (
        <img
          src={optimizedSrc}
          alt={alt}
          className="optimized-image__img"
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
        />
      )}

      {/* Estado de error */}
      {hasError && (
        <div className="optimized-image__error">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Imagen no disponible</span>
        </div>
      )}

      {/* Loading spinner */}
      {!isLoaded && !hasError && isInView && (
        <div className="optimized-image__loader">
          <div className="optimized-image__spinner"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
