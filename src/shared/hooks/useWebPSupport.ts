import { useState, useEffect } from 'react';

/**
 * Hook para detectar soporte de WebP en el navegador
 * @returns boolean indicando si el navegador soporta WebP
 */
export const useWebPSupport = (): boolean => {
  const [supportsWebP, setSupportsWebP] = useState<boolean>(true);

  useEffect(() => {
    const checkWebPSupport = async () => {
      // Si no hay Canvas API, asumimos que no soporta WebP
      if (!window.createImageBitmap) {
        setSupportsWebP(false);
        return;
      }

      // Crear una pequeña imagen WebP
      const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
      
      try {
        const response = await fetch(webpData);
        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);
        
        // Si llegamos aquí, el navegador soporta WebP
        setSupportsWebP(imageBitmap.width === 1 && imageBitmap.height === 1);
      } catch {
        setSupportsWebP(false);
      }
    };

    checkWebPSupport();
  }, []);

  return supportsWebP;
};

/**
 * Convierte una URL de imagen a su equivalente WebP si existe
 * @param src URL de la imagen original
 * @param supportsWebP Si el navegador soporta WebP
 * @returns URL de la imagen (WebP o original)
 */
export const getOptimizedImageSrc = (src: string, supportsWebP: boolean): string => {
  // Si no soporta WebP o la URL ya es WebP, retornar original
  if (!supportsWebP || src.endsWith('.webp')) {
    return src;
  }

  // Solo intentar convertir URLs de Firebase Storage
  if (src.includes('firebasestorage.googleapis.com')) {
    // Firebase no convierte automáticamente, retornar original
    return src;
  }

  // Para otras URLs, intentar reemplazar la extensión
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return webpSrc;
};
