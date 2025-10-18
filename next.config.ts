import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export configuration
  // output: 'export',
  // trailingSlash: true,
  images: {
    // unoptimized: true // Remove this for dynamic images
  }
  // Removed experimental config to avoid warnings
};

export default nextConfig;
