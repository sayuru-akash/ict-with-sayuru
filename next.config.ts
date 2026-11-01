import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep metadata in the initial head for crawlers and social preview clients.
  htmlLimitedBots: /.*/,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
