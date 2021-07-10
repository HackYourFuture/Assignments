'use strict';
/*------------------------------------------------------------------------------
You know how old your dog is in human years, but what about dog years? Let's
calculate it!

1. Complete the function named `calculateDogAge`.

  - It takes one parameter: your (fictional) puppy's age (number).
  - Calculate your dog's age based on the conversion rate of 1 human year to
    7 dog years.
  - Return a string: "Your doggie is `age` years old in dog years!"

2. Use `console.log` to display the result of the function for three different
   ages.
-----------------------------------------------------------------------------*/

function calculateDogAge(age) {
  return `Your doggie is ${age * 7} years old in dog years!`;
}

console.log(calculateDogAge(1)); // -> "Your doggie is 7 years old in dog years!"
console.log(calculateDogAge(2)); // -> "Your doggie is 14 years old in dog years!"
console.log(calculateDogAge(3)); // -> "Your doggie is 21 years old in dog years!"

// ! Do not change or remove the code below
module.exports = calculateDogAge;
