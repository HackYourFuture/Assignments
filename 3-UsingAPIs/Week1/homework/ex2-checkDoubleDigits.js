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
function checkDoubleDigits(/* TODO add parameter(s) here */) {
  // TODO complete this function
}

function main() {
  checkDoubleDigits(9) // should reject
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));

  checkDoubleDigits(10) // should resolve
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));

  checkDoubleDigits(99) // should resolve
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));

  checkDoubleDigits(100) // should reject
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
module.exports = checkDoubleDigits;
