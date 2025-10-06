import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Disable telemetry
  telemetry: false,
  // Optimize for production
  compress: true,
  // Handle API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
