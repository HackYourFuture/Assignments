module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ['hyf', 'no-autofix'],
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    axios: 'readonly',
  },
  rules: {
    'no-console': 'off',
    'no-var': 'error',
    'prefer-const': 'off',
    'no-autofix/prefer-const': 'warn',
    'new-cap': 'error',
    'no-useless-computed-key': 'error',
    eqeqeq: 'error',
    'no-restricted-syntax': [
      'warn',
      {
        selector:
          "ExpressionStatement > CallExpression > MemberExpression > Identifier[name='map']",
        message: 'Results from `map` are unused. Replace `map` with `forEach`.',
      },
      {
        selector: "MemberExpression[property.name='innerText']",
        message:
          'The homework tests do not support `innerText`. Please replace with `textContent`.',
      },
      {
        selector: "MemberExpression[property.name='innerHTML']",
        message:
          'Please do not use `innerHTML` in the homework. Use `textContent` and/or `document.createElement()` instead.',
      },
      {
        selector: 'ForInStatement',
        message: 'Avoid `for in` loops. Prefer `Object.keys()` instead.',
      },
    ],
    'hyf/use-map-result': 'error',
    'hyf/camelcase': 'warn',
    'hyf/no-commented-out-code': 'warn',
  },
};
