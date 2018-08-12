module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'babel',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'airbnb-base',
  ],
  rules: {
    'max-len': 0,
    'prefer-destructuring': 0,
  }
}
