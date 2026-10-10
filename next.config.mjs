/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Permite construir a un directorio aparte (NEXT_DIST_DIR=.next-verify) para
  // que una build de verificación no pise el .next que usa `next dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    /*
      Solo WebP. Pedir AVIF además duplica las transformaciones, porque cada
      ancho se codifica dos veces, y sobre este catálogo el ahorro no lo paga:
      las fuentes ya son WebP, y medido sobre una muestra de diez imágenes en
      seis anchos, AVIF deja 661 KB contra 1.014 KB de WebP. Son 353 KB de
      diferencia a cambio de duplicar el recurso que se está agotando.
    */
    formats: ["image/webp"],

    /*
      Vercel factura por transformación, y una transformación es una
      combinación única de (imagen, ancho, calidad, formato). Con los anchos
      por defecto —16 candidatos— este catálogo llega a 1.610 transformaciones
      distintas, y el 37% de ellas devuelve un archivo byte-idéntico a otra:
      la mayoría de las fotos de producto miden entre 180 y 800px de ancho, así
      que pedirlas a 1080, 1200, 1920, 2048 y 3840 produce cinco veces el mismo
      archivo y se cobra cinco veces.

      Estos seis anchos son los que el layout realmente pide, derivados de los
      `sizes` de cada componente y contando pantallas de densidad doble:

        256   miniatura de artículo (140px @2x)
        384   ficha de producto en móvil (172px @2x)
        640   ficha de producto en grilla (230px @2x) y tarjeta de blog
        828   tarjeta de blog en escritorio (373px @2x)
        1200  retrato de la tienda y mapa (hasta 605px @2x)
        1920  héroe y foto de ficha a pantalla completa en retina

      Resultado: 274 transformaciones en vez de 1.610, un 83% menos.
    */
    imageSizes: [256, 384],
    deviceSizes: [640, 828, 1200, 1920],

    // El catálogo es estático: una imagen solo cambia con un despliegue nuevo,
    // así que no tiene sentido dejar caducar la transformación y volver a
    // pagarla. 31 días es el máximo que respeta la CDN.
    minimumCacheTTL: 60 * 60 * 24 * 31,

    // Cada calidad distinta es otra transformación. El proyecto usa la de por
    // defecto y nada más; declararlo impide que un tercero queme cuota pidiendo
    // `?q=1`, `?q=2`, `?q=3`… contra el endpoint del optimizador.
    qualities: [75],

    // Mismo motivo: el optimizador solo acepta rutas del catálogo propio.
    localPatterns: [{ pathname: "/assets/img/**", search: "" }],
  },
};

export default nextConfig;
