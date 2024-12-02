import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ['*'],
  //   unoptimized: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
    // unoptimized: true,
  },
};

export default nextConfig;
