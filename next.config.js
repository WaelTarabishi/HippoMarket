/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "https://hippomarket-production-4d90.up.railway.app/",
      },
    ],
  },
};

module.exports = nextConfig;
