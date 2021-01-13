module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2018,
  },
  globals: {
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
  },
  rules: {
    "no-console": "off",
  },
};
