const withImages = require('next-images')

module.exports = withImages({
  esModule: true,
  env: {
    baseURL: `${process.env.BASE_URI}:${process.env.API_GATEWAY_PORT}`
  }
},)
