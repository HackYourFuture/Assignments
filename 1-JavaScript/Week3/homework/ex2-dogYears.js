'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/1-JavaScript/Week3#exercise-2-dog-years

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

function calculateDogAge(dogAge) {
  return dogAge * 7;
}

console.log(`Your doggie is ${calculateDogAge(1)} years old in dog years!`); // -> "Your doggie is 7 years old in dog years!"
console.log(`Your doggie is ${calculateDogAge(2)} years old in dog years!`); // -> "Your doggie is 14 years old in dog years!"
console.log(`Your doggie is ${calculateDogAge(3)} years old in dog years!`); // -> "Your doggie is 21 years old in dog years!"

// ! Do not change or remove the code below
module.exports = calculateDogAge;
