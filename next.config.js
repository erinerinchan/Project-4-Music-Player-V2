const { i18n } = require('./next-i18next.config')

module.exports = {
  // experimental: {
  //   images: {
  //     remotePatterns: [
  //       {
  //         hostname: '*.scdn.co'
  //       }
  //     ]
  //   }
  // },
  images: {
    domains: ['i.scdn.co', 't.scdn.co']
  },
  reactStrictMode: false,
  i18n
}
