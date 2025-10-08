import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  experimental: {
    // Enable turbo for better performance
    turbo: {
      // Add any turbo-specific configurations if needed
    }
  }
};

export default nextConfig;
