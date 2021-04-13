const { factorial } = require('./ex7-calcRPN');

describe('RPN functions', () => {
  it('`factorial` should compute the factorial of its argument', () => {
    const result = factorial(5.2);
    expect(result).toBe(12);
  });
});
