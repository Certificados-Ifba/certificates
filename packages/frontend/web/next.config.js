const withImages = require('next-images')
module.exports = withImages({
  esModule: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  env: {
    baseURL: process.env.API_URI || 'http://localhost:3001',
    siteKey: process.env.HCAPTCHA_SITEKEY
  }
})
