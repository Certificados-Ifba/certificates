module.exports = {
  env: {
    development: {
      presets: ['next/babel'],
      plugins: [
        [
          'babel-plugin-styled-components',
          { ssr: true, displayName: true, preprocess: false }
        ]
      ]
    },
    production: {
      presets: ['next/babel'],
      plugins: [
        [
          'babel-plugin-styled-components',
          { ssr: true, displayName: true, preprocess: false }
        ]
      ]
    },
    test: {
      presets: ['next/babel']
    },
  },
  plugins: [
    [
      'styled-components',
      { ssr: true }
    ],
    'inline-react-svg'
  ]
}
