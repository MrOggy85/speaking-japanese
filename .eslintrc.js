module.exports = {
  root: true,
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
    'plugin:vue/recommended',
    'airbnb-base',
    '@vue/airbnb',
  ],
  rules: {
    'max-len': 0,
    'prefer-destructuring': 0,
    'import/newline-after-import': 0,
    'arrow-body-style': 0,
    'object-curly-newline': 0,
    'arrow-parens': 0,
    'brace-style': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,

    'vue/max-attributes-per-line': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-self-closing': 0,
  },
};
