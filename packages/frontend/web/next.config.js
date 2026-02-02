const withImages = require('next-images')
const path = require('path')

module.exports = withImages({
  swcMinify: true,
  esModule: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  webpack: (config) => {
    config.resolve.modules.push(path.resolve(__dirname, 'node_modules'))
    return config
  },
  env: {
    baseURL: process.env?.API_URI || 'http://localhost:4001',
    siteKey: process.env?.HCAPTCHA_SITEKEY,
    sheetPass: process.env.SHEET_PASSWORD || '',
  },
  async redirects() {
    return [
      {
        source: '/certificados',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
})
