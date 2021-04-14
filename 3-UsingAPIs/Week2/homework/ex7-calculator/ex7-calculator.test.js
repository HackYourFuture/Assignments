const extensions = require('./ex7-calculator');

describe('RPN functions', () => {
  it('`fact` should compute the factorial of its argument', () => {
    const result = extensions.fact(5.2);
    expect(result).toBe(12);
  });
});
