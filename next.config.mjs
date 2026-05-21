/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", "192.168.0.105"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // Turbopack alias (Next.js 16 default bundler)
  turbopack: {
    root: import.meta.dirname,
    resolveAlias: {
      "@": "./src",
    },
  },
};

export default nextConfig;
