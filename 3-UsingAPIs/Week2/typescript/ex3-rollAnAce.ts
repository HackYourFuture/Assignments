/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-3-roll-an-ace

1. Run the unmodified exercise and observe that it works as advertised. Observe 
   that the die must be thrown an indeterminate number of times until we get an 
   ACE or until it rolls off the table.
2. Now, rewrite the body of the `rollDieUntil()` function using async/await and 
   without using recursion. Hint: a `while` loop may come handy.
3. Refactor the function `main()` to use async/await and try/catch.
------------------------------------------------------------------------------*/
// ! Do not change or remove the next two lines
import { DieFace, rollDie } from './pokerDiceRoller.js';

/**
 * Rolls a die until the desired value is rolled.
 */
export function rollDieUntil(desiredValue: DieFace): Promise<DieFace> {
  return rollDie().then((value) => {
    if (value !== desiredValue) {
      return rollDieUntil(desiredValue);
    }
    return value;
  });
}

function main() {
  rollDieUntil('ACE')
    .then((results) => console.log('Resolved!', results))
    .catch((error) => console.log('Rejected!', error.message));
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
