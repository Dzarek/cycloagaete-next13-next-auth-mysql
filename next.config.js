const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV !== "development",
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

module.exports = withPWA(nextConfig);
