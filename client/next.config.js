/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "asset.cloudinary.com",
      "placeimg.com",
      "graph.facebook.com",
    ],
  },
};

module.exports = nextConfig;
