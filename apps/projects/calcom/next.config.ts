import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "app.hookra.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
  transpilePackages: ["@creantly/ui"],
};

export default nextConfig;
