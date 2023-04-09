const withTM = require('next-transpile-modules')(['tailwindcss'])

const nextConfig = withTM({
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
})

module.exports = nextConfig
