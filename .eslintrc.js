module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript/base',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {},
};
