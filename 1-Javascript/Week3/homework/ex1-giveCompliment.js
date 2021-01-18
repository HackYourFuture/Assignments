"use strict";
/* -----------------------------------------------------------------------------
1. Write a function named `giveCompliment` with the following characteristics:

  - It takes a single argument: `name`.
  - Its function body includes a variable that holds an array, `compliments`, 
    initialized with 10 strings. Each string should be a compliment, like 
    "great", `awesome" and so on.
  - It should randomly select a compliment from the array.
  - It should return the string **"You are `compliment`, `name`!", where `
    compliment`is a randomly selected compliment and `name>` is the name that 
    was passed as the function's argument.

2. Call the function three times, giving each function call the same argument: 
   your name. Use `console.log` each time to display the return value of the 
   `giveCompliment` function to the console.
-----------------------------------------------------------------------------*/

function giveCompliment(/* parameters go here */) {
  // TODO: replace this comment with your code
}

// TODO: substitute your own name for "HackYourFuture"
const myName = "HackYourFuture";

console.log(giveCompliment(myName));
console.log(giveCompliment(myName));
console.log(giveCompliment(myName));

// ! Do not change or remove the code below
module.exports = giveCompliment;
