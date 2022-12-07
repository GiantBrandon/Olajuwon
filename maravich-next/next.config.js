/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
}

const withPWA = require('next-pwa')({
  dest: 'public',
  buildExcludes: [/app-build-manifest.json$/]
})

module.exports = withPWA(nextConfig)
