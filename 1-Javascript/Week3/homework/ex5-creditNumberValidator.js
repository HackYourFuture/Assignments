"use strict";
/*
 * Complete the function below.
 *
 * The function should return true or false depending on if the given credit card is valid or not.
 * These are the rules for a valid credit card number:
 *
 * - Input must be 16 characters
 * - All characters must be numbers
 * - At least two different numbers should be represented
 * - The last number must be even
 * - The sum of all the numbers must be greater than 16
 *
 * The following credit card numbers are valid:
 * - 9999777788880000
 * - 6666666666661666
 *
 * The following credit card numbers are invalid:
 * - a92332119c011112 (invalid characters)
 * - 4444444444444444 (only one type of number)
 * - 1111111111111110 (sum less than 16)
 * - 6666666666666661 (odd final number)
 */

function validateCreditNumber(/* argument(s) go here*/) {
  // add your code here
}

validateCreditNumber("a92332119c011112"); // Returns "Invalid! The input a92332119c011112 should contain only numbers!""
validateCreditNumber("4444444444444444"); // Returns "Invalid! The input 4444444444444444 should contain at least 2 different types of numbers!""
validateCreditNumber("6666666666661666"); // Returns "Success! The input 6666666666661666 is a valid credit card number!""

// Do not modify or delete anything below this line
module.exports = {
  validateCreditNumber,
};
