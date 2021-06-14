'use strict';
/*------------------------------------------------------------------------------
- Run the unmodified program and confirm that problem described occurs.
- Refactor the `rollDice()` function from callback-based to returning a
  promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDice()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/

// TODO Remove callback and return a promise
function rollDice(callback) {
  // Compute a random number of rolls (3-10) that the dice MUST complete
  const randomRollsToDo = Math.floor(Math.random() * 8) + 3;
  console.log(`Dice scheduled for ${randomRollsToDo} rolls...`);

  const rollOnce = (roll) => {
    // Compute a random dice value for the current roll
    const value = Math.floor(Math.random() * 6) + 1;
    console.log(`Dice value is now: ${value}`);

    // Use callback to notify that the dice rolled off the table after 6 rolls
    if (roll > 6) {
      // TODO replace "error" callback
      callback(new Error('Oops... Dice rolled off the table.'));
    }

    // Use callback to communicate the final dice value once finished rolling
    if (roll === randomRollsToDo) {
      // TODO replace "success" callback
      callback(null, value);
    }

    // Schedule the next roll todo until no more rolls to do
    if (roll < randomRollsToDo) {
      setTimeout(() => rollOnce(roll + 1), 500);
    }
  };

  // Start the initial roll
  rollOnce(1);
}

// TODO Refactor to use promise
rollDice((error, value) => {
  if (error !== null) {
    console.log(error.message);
  } else {
    console.log(`Success! Dice settled on ${value}.`);
  }
});

// ! Do not change or remove the code below
module.exports = rollDice;
