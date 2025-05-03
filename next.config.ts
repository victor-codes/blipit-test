import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: "/blnk/:path*",
        destination: `${process.env.BLNK_INSTANCE_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
