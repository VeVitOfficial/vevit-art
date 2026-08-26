import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Legacy /<nick> shortcut pages (were meta-refresh HTML files) → homepage popup
      { source: "/anelly", destination: "/?open=anelly", permanent: false },
      { source: "/art3mis", destination: "/?open=art3mis", permanent: false },
      { source: "/anelly/", destination: "/?open=anelly", permanent: false },
      { source: "/art3mis/", destination: "/?open=art3mis", permanent: false },
      // Legacy .html routes → App Router paths
      { source: "/list.html", destination: "/list", permanent: true },
      { source: "/artist.html", destination: "/artist", permanent: true },
      { source: "/404.html", destination: "/not-found", permanent: true },
    ];
  },
};

export default nextConfig;