/** @type {import('next').NextConfig} */
const nextConfig = {
  // cPanel Node.js deploy: copies the minimum runtime into .next/standalone
  // Switch to 'export' if deploying to plain Apache shared hosting.
  output: process.env.NEXT_OUTPUT === "export" ? "export" : "standalone",

  images: {
    // When static-exporting, Next cannot optimize images at request time.
    unoptimized: process.env.NEXT_OUTPUT === "export",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "i1.wp.com" },
      { protocol: "https", hostname: "i2.wp.com" },
      { protocol: "https", hostname: "i3.wp.com" },
      { protocol: "https", hostname: "**.wp.com" },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
