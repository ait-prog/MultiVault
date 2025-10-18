import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export configuration
  // output: 'export',
  // trailingSlash: true,
  images: {
    // unoptimized: true // Remove this for dynamic images
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  }
  // Removed experimental config to avoid warnings
};

export default nextConfig;
