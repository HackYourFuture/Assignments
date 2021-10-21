'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/3-UsingAPIs/Week1#exercise-2-is-it-a-double-digit-number

Complete the function called `checkDoubleDigits` such that:

- It takes one argument: a number
- It returns a `new Promise`.
- If the number between 10 and 99 it should resolve to the string
  "This is a double digit number!".
- For any other number it should reject with an an Error object containing: 
  "Expected a double digit number but got `number`", where `number` is the 
  number that was passed as an argument.
------------------------------------------------------------------------------*/
function checkDoubleDigits(number) {

  return new Promise((resolve, reject) => {
    if (number >= 10 && number <= 99) {
      resolve("This is a double digit number!");
    }
    else {
      reject(new Error(`Expected a double digit number but got ${number}`));
    }
  });
}

checkDoubleDigits(11) // should resolve
  .then((message) => console.log(message))
  .catch((error) => console.log(error.message));

checkDoubleDigits(5) // should reject
  .then((message) => console.log(message))
  .catch((error) => console.log(error.message));

checkDoubleDigits(123) // should reject
  .then((message) => console.log(message))
  .catch((error) => console.log(error.message));

// ! Do not change or remove the code below
module.exports = checkDoubleDigits;
