/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Permite construir a un directorio aparte (NEXT_DIST_DIR=.next-verify) para
  // que una build de verificación no pise el .next que usa `next dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
