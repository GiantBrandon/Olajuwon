/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: ['drive.google.com'],
  },
  webpack(config, { isServer, dev }) {
    config.experiments = {
      layers: true,
      asyncWebAssembly: true
    };
    config.output.webassemblyModuleFilename =
      isServer && !dev ? "../static/wasm/[id].wasm" : "static/wasm/[id].wasm";
    config.optimization.moduleIds = "named";

    return config;
  }
}

const withPWA = require("@imbios/next-pwa")({
  dest: "public",
});

module.exports = withPWA(nextConfig)
