module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ["prettier", "hyf", "no-autofix"],
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    page: "readonly",
    browser: "readonly",
    context: "readonly",
    jestPuppeteer: "readonly",
    axios: "readonly",
  },
  rules: {
    "prettier/prettier": "warn",
    "no-console": "off",
    "no-var": "error",
    "prefer-const": "off",
    "no-autofix/prefer-const": "warn",
    "new-cap": "error",
    "no-useless-computed-key": "error",
    eqeqeq: "error",
    "no-restricted-syntax": [
      "warn",
      {
        selector:
          "ExpressionStatement > CallExpression > MemberExpression > Identifier[name='map']",
        message: "Results from `map` are unused. Replace `map` with `forEach`.",
      },
      {
        // disallow numeric literals as array indices (zero is allowed)
        selector: "MemberExpression[computed] > Literal[value>0]",
        message: "No literal",
      },
    ],
    "hyf/use-map-result": "error",
    "hyf/camelcase": "warn",
    "hyf/no-commented-out-code": "warn",
  },
};
