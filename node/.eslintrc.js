const OFF = 0;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  env: { 'jest/globals': true },
  plugins: ['jest', 'prettier'],
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'prettier/prettier': [ERROR, { trailingComma: 'es5', singleQuote: true }],
    'no-console':OFF
  },
};
