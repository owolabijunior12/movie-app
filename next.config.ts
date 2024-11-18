import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Can also be 'http' if required
        hostname: 'image.tmdb.org', // Add the domain of your image URL
      // Match specific paths or use `**` for all paths
      },
   
    ],
  },
};

export default nextConfig;
