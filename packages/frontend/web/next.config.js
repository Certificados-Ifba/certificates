const withImages = require('next-images')
module.exports = withImages({
  swcMinify: true,
  esModule: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  env: {
    baseURL: process.env?.API_URI || 'http://localhost:3001',
    siteKey: process.env?.HCAPTCHA_SITEKEY,
    sheetPass: process.env.SHEET_PASSWORD || '',
  },
  images: {
    domains: [
      'localhost',
      '*.cloudflare.net',
      '*.amazonaws.com',
      '*.azure.net',
    ],
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
