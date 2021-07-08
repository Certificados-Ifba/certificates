const withImages = require('next-images')
module.exports = withImages({
  esModule: true,
  env: { baseURL: process.env.API_URI || 'http://localhost:3001' }
},)
