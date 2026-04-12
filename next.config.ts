import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb',
    },
    middlewareClientMaxBodySize: '100mb'
  },
};

export default nextConfig;
