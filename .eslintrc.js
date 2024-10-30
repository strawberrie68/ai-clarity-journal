module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': ['error', {
      'singleQuote': true,
      'semi': true,
      'trailingComma': 'all',
    }],
  },
};