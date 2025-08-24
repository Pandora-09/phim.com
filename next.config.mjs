/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // bật static export
  images: {
    unoptimized: true, // nếu bạn dùng <Image/> thì cần thêm dòng này
  },
};

module.exports = nextConfig;
