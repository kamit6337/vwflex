/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Enable parsing of JSON in the request body
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
