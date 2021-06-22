'use strict';
/*------------------------------------------------------------------------------
1. Complete the function `rollTheDices()` by using `Promise.race()`.
2. Refactor the function `main()` using async/await and try/catch.
3. Once you got this working, you may observe that some dices continue rolling 
   for some undetermined time after the promise returned by `Promise.race()` 
   resolves. Do you know why? Add your answer as a comment to the bottom of the 
   file.
------------------------------------------------------------------------------*/
// ! Do not remove this line
const rollDice = require('../../helpers/pokerDiceRoller');

function rollTheDices() {
  const dices = [1, 2, 3, 4, 5];
  // TODO complete this function; use Promise.race() and rollDice()
  return Promise.race(dices.map(rollDice));
}

// Refactor this function to use async/await and try/catch
async function main() {
  await rollTheDices();
  await console.log;
  await console.error;
}
// although there is used promise race which can solve the problems that  promise all can't solve last time, but async ,await pauses the execution of the function and waits for the passed  resolution and returns it again.
main();

// ! Do not change or remove the code below
module.exports = rollTheDices;
