'use strict';
/* -----------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/1-JavaScript/Week3#exercise-1-you-are-amazing

1. Complete the function named giveComplimentas follows:

   - It should take a single parameter: name.
   - Its function body should include a variable that holds an array,
     compliments, initialized with 10 strings. Each string should be a
     compliment, like "great", "awesome" and so on.
   - It should randomly select a compliment from the array.
   - It should return the string "You are compliment, name!", where
     compliment is a randomly selected compliment and name is the name that
     was passed as an argument to the function.

2. Call the function three times, giving each function call the same argument:
   your name.
   Use console.log each time to display the return value of the
   giveCompliment function to the console.
-----------------------------------------------------------------------------*/
function giveCompliment(myName) {
const compliments=['amazing','awesome','perfect','good job','excellent','genius ' ,'super','incredible','unbelievable ','fantastic','great job'];
const compliment = compliments[Math.floor(Math.random() * compliments.length)];
const result = `You are ${compliment}, ${myName}!`;
return result;
}

// TODO substitute your own name for "HackYourFuture"
const myName = 'ahmed';

console.log(giveCompliment(myName));
console.log(giveCompliment(myName));
console.log(giveCompliment(myName));

const yourName = 'Amsterdam';

console.log(giveCompliment(yourName));
console.log(giveCompliment(yourName));
console.log(giveCompliment(yourName));

// ! Do not change or remove the code below
module.exports = giveCompliment;