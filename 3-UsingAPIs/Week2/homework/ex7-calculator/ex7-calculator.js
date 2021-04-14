// Intentional block scope -- do not remove
{
  /* eslint-disable no-inner-declarations */

  const MATHEMATICAL = 'Mathematical';
  const CONVERSION = 'Conversion';

  /**
   * Computes the factorial of `x`.
   *
   * If `x` is a floating point number this function rounds it down to the
   * nearest integer before computing the factorial.
   * @param {number} x Input value.
   * @returns {number} The computed factorial.
   * @throws If `x` is negative.
   */
  function fact(x) {
    // TODO replace next line with your code
    throw new Error('Not implemented');
  }
  fact.title = 'Factorial (!)';
  fact.category = MATHEMATICAL;

  /**
   * Converts from °C to °F.
   * @param {number} x The temperature in °C.
   * @returns {number} The temperature in °F.
   */
  function c2f(x) {
    // TODO replace next line with your code
    throw new Error('Not implemented');
  }
  c2f.title = '°C → °F';
  c2f.category = CONVERSION;

  /**
   * Converts from °F to °C.
   * @param {number} x The temperature in °F.
   * @returns {number} The temperature in °C.
   */
  function f2c(x) {
    // TODO replace next line with your code
    throw new Error('Not implemented');
  }
  f2c.title = '°F → °C';
  f2c.category = CONVERSION;

  // ! Do not change or remove the code below
  module.exports = {
    fact,
    c2f,
    f2c,
  };
}
// End of intentional block scope
