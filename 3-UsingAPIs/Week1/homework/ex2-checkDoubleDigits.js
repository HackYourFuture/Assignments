'use strict';
/*------------------------------------------------------------------------------
Complete the function called `checkDoubleDigits` such that:

- It takes one argument: a number
- It returns a `new Promise`.
- If the number between 10 and 99 it should resolve to the string
  "This is double digit number!".
- For any other number it should reject with an an Error object containing: 
  "Expected a double digit number but got `number`", where `number` is the 
  number that was passed as an argument.
------------------------------------------------------------------------------*/
function checkDoubleDigits(number) {
  // TODO complete this function
  return new Promise((resolve, reject) => {
    if (number > 10 && number < 99) {
      resolve('This is a double digit number!');
    } else {
      reject(new Error(`Expected a double digit number but got ${number}`)); //This is an object
    }
  });
}
console.log(checkDoubleDigits(11));
checkDoubleDigits(11) // should resolve
  .then((message) => console.log(message)) //should has and is
  .catch((error) => console.log(error.message)); //

checkDoubleDigits(5) // should reject
  .then((message) => console.log(message))
  .catch((error) => console.log(error.message));

checkDoubleDigits(123) // should reject
  .then((message) => console.log(message))
  .catch((error) => console.log(error.message));

// ! Do not change or remove the code below
module.exports = checkDoubleDigits;
