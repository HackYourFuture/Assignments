/*------------------------------------------------------------------------------
- Run the unmodified program and confirm that problem described occurs.
- Refactor the `rollBack()` function from callback-based to returning a
  promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDice()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/

// The line below makes the rollDice() function available to this file.
// Do not change or remove it.
const rollDice = require("../../helpers/pokerDiceRoller");

function rollTheDices() {
  // TODO Refactor this function
  const dices = [1, 2, 3, 4, 5];
  return rollDice(1);
}

rollTheDices()
  .then((results) => console.log("Resolved!", results))
  .catch((error) => console.log("Rejected!", error.message));

// ! Do not change or remove the code below
module.export = rollTheDices;
