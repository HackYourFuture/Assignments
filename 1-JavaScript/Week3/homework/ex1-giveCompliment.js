'use strict';
/* -----------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/1-JavaScript/Week3#exercise-1-you-are-amazing

1. Complete the function named `giveCompliment`as follows:

   - It should take a single parameter: `name`.
   - Its function body should include a variable that holds an array,
     `compliments`, initialized with 10 strings. Each string should be a
     compliment, like `"great"`, `"awesome"` and so on.
   - It should randomly select a compliment from the array.
   - It should return the string "You are `compliment`, `name`!", where
     `compliment` is a randomly selected compliment and `name` is the name that
     was passed as an argument to the function.

2. Call the function three times, giving each function call the same argument:
   your name.
   Use `console.log` each time to display the return value of the
   `giveCompliment` function to the console.
-----------------------------------------------------------------------------*/
function giveCompliment(name) {
  const compliments = [
    'Awesome',
    'Beautiful',
    'Lovely',
    'Kind',
    'Nice',
    'Cool',
    'Good',
    'Handsome',
    'Kind',
    'Friendly',
  ];

  const randomlyCompliment =
    compliments[Math.floor(Math.random() * compliments.length)];
  return `You are ${randomlyCompliment} , ${name} !`;
}
console.log(giveCompliment('mariano'));
console.log(giveCompliment('mariano'));
console.log(giveCompliment('mariano'));
function main() {
  const myName = 'HackYourFuture';
  console.log('HALLO WORLD');

  console.log(giveCompliment(myName));
  console.log(giveCompliment(myName));
  console.log(giveCompliment(myName));

  const yourName = 'Amsterdam';

  console.log(giveCompliment(yourName));
  console.log(giveCompliment(yourName));
  console.log(giveCompliment(yourName));
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
module.exports = giveCompliment;
