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
      { selector: 'ForInStatement', message: 'Avoid `for in` loops' },
    ],
    'hyf/use-map-result': 'error',
    'hyf/camelcase': 'warn',
    'hyf/no-commented-out-code': 'warn',
  },
};
