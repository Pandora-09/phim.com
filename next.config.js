/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.ophim.cc", "ophim1.com"],
    domains: ["img.ophim.live", "img.ophim.live"],
  },
  async rewrites() {
    return [
      {
        source: "/phim/:slug",
        destination: "/movie/:slug",
      },
    ];
  },
};

module.exports = nextConfig;
