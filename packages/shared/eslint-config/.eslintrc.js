
module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/react'
  ],
  globals : {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
  '@typescript-eslint',
  'prettier',
  'import-helpers',
  'react'
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'error',
    'space-before-function-paren': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-new': 'off',
    'import/no-unresolved': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'camelcase': 'off',
    '@typescript-eslint/ban-types': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': [
          '**/*.spec.ts',
          'src/utils/tests/*.ts'
        ]
      }
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/camelcase': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        'newlinesBetween': 'always',
        'groups': [
          'module',
          ['parent', 'sibling', 'index']
        ],
        'alphabetize': { 'order': 'asc', 'ignoreCase': true }
      }
    ]
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  settings: {
    'import/extensions': ['.ts', '.js'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    },
    react: {
      version: 'detect',
    },
  }
}
