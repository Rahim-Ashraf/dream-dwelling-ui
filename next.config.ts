import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // images: {
  //   domains: ['i.ibb.co', 'i.ibb.co.com', 'lh3.googleusercontent.com'],
  // },
};

export default nextConfig;
