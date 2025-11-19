/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Vercel serverless functions
  output: 'standalone',

  // Enable production source maps for debugging
  // Source maps help with error tracking and debugging in production
  // without exposing more information than what's already in the bundles
  productionBrowserSourceMaps: true,

  // Enable image optimization with external domains
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Webpack configuration for enhanced source map control
  webpack: (config, { dev, isServer }) => {
    // Configure source maps for production builds
    if (!dev) {
      config.devtool = 'source-map';

      // Ensure source maps are generated for all first-party code
      // This includes main-app.js, page.js, layout.js and other bundles
      config.optimization = {
        ...config.optimization,
        // Keep module IDs readable for better debugging
        moduleIds: 'named',
      };
    }

    return config;
  },

  // Headers are now configured in vercel.json for better Vercel integration
}

module.exports = nextConfig
