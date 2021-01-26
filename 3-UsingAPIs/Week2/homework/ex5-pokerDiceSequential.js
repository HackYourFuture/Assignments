/* eslint-disable no-unused-vars */
/*------------------------------------------------------------------------------
------------------------------------------------------------------------------*/

// The line below makes the rollDice() function available to this file.
// Do not change or remove it.
const rollDice = require("../../helpers/pokerDiceRoller");

// The dice numbers to use.
const dices = [1, 2, 3, 4, 5];

// Fixed chain of promises.
// Pro: straightforward
// Con: not DRY, cannot deal with an arbitrary number of dices.
function rollSequentialPromiseChain() {
  const results = [];
  return rollDice(1)
    .then((value) => {
      results.push(value);
      return rollDice(2);
    })
    .then((value) => {
      results.push(value);
      return rollDice(3);
    })
    .then((value) => {
      results.push(value);
      return rollDice(4);
    })
    .then((value) => {
      results.push(value);
      return rollDice(5);
    })
    .then((value) => {
      results.push(value);
      return results;
    });
}

// Using a .forEach() method.
// Pro: works for an arbitrary number of dices.
// Con: complicated code
function rollSequentialWithForEach() {
  console.log("Sequential with forEach()");
  const results = [];
  let promise = Promise.resolve();
  dices.forEach((dice) => {
    promise = promise.then((result) => {
      if (result) results.push(result);
      return rollDice(dice);
    });
  });
  return promise
    .then((result) => {
      results.push(result);
      console.log("Your throw:", results);
    })
    .catch((error) => console.log(error.message));
}

// Using a .reduce() method.
// Pro: works for an arbitrary number of dices.
// Con: complicated code
function rollSequentialWithReduce() {
  console.log("Sequential with reduce()");
  const results = [];
  return dices
    .reduce((promise, dice) => {
      return promise.then((result) => {
        if (result) results.push(result);
        return rollDice(dice);
      });
    }, Promise.resolve())
    .then((result) => {
      results.push(result);
      console.log("Your throw:", results);
    })
    .catch((error) => console.log(error.message));
}

// Using async/await.
// Pro: simple code, works for an arbitrary number of dices.
async function rollSequentialWithAsyncAwait() {
  console.log("Sequential with async/await");
  const results = [];
  // TODO: complete this function
  return results;
}

// TODO: replace promise chain with async/await and try/catch
function main(rollFunction) {
  rollFunction()
    .then((results) => console.log("Resolved!", results))
    .catch((error) => console.log("Rejected!", error.message));
}

// Replace the argument with the name of the function you want to try.
main(rollSequentialWithAsyncAwait);

module.export = rollSequentialWithAsyncAwait;
