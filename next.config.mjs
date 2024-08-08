/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "semie.cooking",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "semie.counseling",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
