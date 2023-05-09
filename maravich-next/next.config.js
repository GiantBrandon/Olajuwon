/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
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

const withPWA = require('next-pwa')({
  dest: 'public',
  buildExcludes: [/app-build-manifest.json$/]
})

module.exports = withPWA(nextConfig)
