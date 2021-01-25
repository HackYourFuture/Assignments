"use strict";
/*------------------------------------------------------------------------------
- Run the unmodified program and confirm that problem described occurs.
- Refactor the `rollBack()` function from callback-based to returning a
  promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDice()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/

// TODO: Remove callback and return a promise
function rollDice(callback) {
  const todo = Math.floor(Math.random() * 10) + 1;
  console.log(`Dice starts rolling...`);
  const rollOnce = (roll) => {
    const value = Math.floor(Math.random() * 6) + 1;
    console.log(`Dice value is now: ${value}`);
    if (roll === todo) {
      // TODO: replace "success" callback
      callback(null, value);
    }
    if (roll > 6) {
      // TODO: replace "error" callback
      callback(new Error("Oops... Dice rolled off the table."));
    }
    if (roll < todo) {
      setTimeout(() => rollOnce(roll + 1), 500);
    }
  };
  rollOnce(1);
}

// TODO: Refactor to use promise
rollDice((error, value) => {
  if (error !== null) {
    console.log(error.message);
  } else {
    console.log(`Success! Dice settled on ${value}.`);
  }
});

// ! Do not change or remove the code below
module.exports = rollDice;
