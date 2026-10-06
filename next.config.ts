import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async rewrites() {
    return process.env.NEXT_PUBLIC_PORTFOLIO_API_ENABLED === "true"
      ? [
          {
            source: "/api/:path*",
            destination: "http://127.0.0.1:8766/api/:path*",
          },
        ]
      : [];
  },
};
export default nextConfig;
