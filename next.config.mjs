/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    // Modern formats — AVIF is smaller than JPEG at similar quality; WebP is the fallback.
    formats: ['image/avif', 'image/webp'],
    // Allow high-quality renders for a cinematographer's portfolio. Default per-image quality
    // is set on the <Placeholder> component; this list whitelists what's permitted.
    qualities: [75, 85, 90, 92, 95],
    // Standard device breakpoints — gives next/image good srcset granularity for tile thumbnails.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560, 3840],
    // Long cache for the optimized outputs (they're addressed by their hash).
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default nextConfig;
