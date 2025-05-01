import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

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
