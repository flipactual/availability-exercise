module.exports = {
  plugins: ['prettier'],
  extends: ['react-app', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { trailingComma: 'es5', singleQuote: true }],
  },
};
