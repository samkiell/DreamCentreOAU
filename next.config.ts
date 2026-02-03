import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Uncomment and add remote patterns when using external CMS
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'cdn.example.com',
    //   },
    // ],
  },
};

export default nextConfig;
