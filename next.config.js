/** @type {import('next').NextConfig} */
const path = require('path')

const withTM = require('next-transpile-modules')(['tailwindcss'])

const nextConfig = withTM({
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    tsconfigPaths: [path.join(__dirname, 'tsconfig.json')],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        fs: false,
        module: false,
      }
    }

    return config
  },
})

module.exports = nextConfig
