const withTM = require('next-transpile-modules')(['tailwindcss'])

const nextConfig = withTM({
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'ru', 'uk'],
    defaultLocale: 'en',
  },
})

module.exports = nextConfig
