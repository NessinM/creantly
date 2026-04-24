import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "app.cal.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
  transpilePackages: ["@creantly/ui"],
};

export default nextConfig;
