/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    // Enable if needed for monorepo setup
    transpilePackages: [],
  },
}

module.exports = nextConfig
