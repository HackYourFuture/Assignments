'use strict';
/*------------------------------------------------------------------------------
1. Run the unmodified exercise and observe that it works as advertised. Observe 
   that the dice must be thrown an indeterminate number of times until we get an 
   ACE or until it rolls off the table.
2. Now, rewrite the body of the `rollDiceUntil()` function using async/await and 
   without using recursion. Hint: a `while` loop may come handy.
3. Refactor the function `main()` to use async/await and try/catch.
------------------------------------------------------------------------------*/
// ! Do not change or remove the next two lines
const rollDice = require('../../helpers/pokerDiceRoller');

function rollDiceUntil(wantedValue) {
  // TODO: rewrite this function using async/await
  return rollDice().then((value) => {
    if (value !== wantedValue) {
      return rollDiceUntil(wantedValue);
    }
    return value;
  });
}

// TODO refactor this function to use try/catch
function main() {
  rollDiceUntil('ACE')
    .then((results) => console.log('Resolved!', results))
    .catch((error) => console.log('Rejected!', error.message));
}

const main = async () => {
  try {
    const rollDice = await rollDiceUntil();
  } catch (error) {
    console.log(error);
  }
};

// ! Do not change or remove the code below
module.exports = rollDiceUntil;
