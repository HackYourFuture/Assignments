# Homework Using APIs Week 1

## Exercises

The homework for this week can be found in the `homework` folder.

### Exercise 1: John who?

### File: `ex1-johnWho.js`

Take a look at the following function (and try it out in your console):

```js
const getAnonName = (firstName, callback) => {
  setTimeout(() => {
    if (!firstName) {
      callback(new Error("You didn't pass in a first name!"));
      return;
    }

    const fullName = `${firstName} Doe`;

    callback(fullName);
  }, 1000);
};

getAnonName("John", console.log);
```

Rewrite this function, but replace the callback syntax with the Promise syntax:

- Have the `getAnonName` function return a `new Promise`.
- If the Promise `resolves`, pass the full name as an argument to resolve with.
- If the Promise `rejects`, pass an error as the argument to reject with: "You didn't pass in a first name!"

### Exercise 2: Is it a double digit number?

#### File: `checkDoubleDigits.js`

Complete the function called `checkDoubleDigits` such that:

- It takes one argument: a number
- It returns a `new Promise`.
- If the number between 10 and 99 it should resolve to the string "This is double digit number!".
- For any other number it should reject with an an Error object containing: "Expected a double digit number but got `number`", where `number` is the number that was passed as an argument.

### Exercise 3: Roll a dice

### File `ex3-rollDice.js`

This exercise is about throwing a dice. A dice in this exercise may roll up to 10 times before it settles on a final value, depending on the energy with a is thrown. Unfortunately, if a dice rolls more than six times in our game it roll off the table and the throw becomes invalid. If it rolls six times or less, its final value will be valid.

> Note: to keep things simple, we have taken some liberties in this exercise with respect to how a dice behaves in reality. For instance, in real life a dice cannot flip back to a value it previously had. Besides, it will mostly roll on its corners, not on its sides.

The existing `rollDice()` function in the exercise file uses a callback to notify the caller of success or failure. Here is the code:

```js
function rollDice(callback) {
  const todo = Math.floor(Math.random() * 10) + 1;
  console.log(`Dice starts rolling...`);
  const rollOnce = (roll) => {
    const value = Math.floor(Math.random() * 6) + 1;
    console.log(`Dice value is now: ${value}`);
    if (roll === todo) {
      callback(null, value);
    }
    if (roll > 6) {
      callback(new Error("Oops... Dice rolled off the table."));
    }
    if (roll < todo) {
      setTimeout(() => rollOnce(roll + 1), 500);
    }
  };
  rollOnce(1);
}

rollDice((error, value) => {
  if (error !== null) {
    console.log(error.message);
  } else {
    console.log(`Success! Dice settled on ${value}.`);
  }
});
```

Here is what the output could look like for a successful throw:

```text
❯ node .\ex3-rollDice.js
Dice starts rolling...
Dice value is now: 2
Dice value is now: 3
Dice value is now: 4
Dice value is now: 5
Dice value is now: 6
Success! Dice settled on 6.
```

However, there is a problem when the dice rolls off the table. In that case we expect a single error callback and no "success" callbacks. Evidently this is not what we are getting in the random throw below.

```text
❯ node .\ex3-rollDice.js
Dice starts rolling...
Dice value is now: 3
Dice value is now: 1
Dice value is now: 3
Dice value is now: 3
Dice value is now: 1
Dice value is now: 2
Dice value is now: 4
Oops... Dice rolled off the table.
Dice value is now: 5
Success! Dice settled on 5.
Oops... Dice rolled off the table
```

Since we want to practice with promises anyway, let's see how what happens when we refactor the code to use promises:

- Run the unmodified program and confirm that problem as described can be reproduced.
- Refactor the `rollBack()` function from using a callback to returning a promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that calls `rollDice()` to use the returned promise.
- Does the problem described above still occur? If not, what would be your explanation? Add your answer as a comment to be bottom of the file.

### Exercise 4: Throw the dices for a Poker Dice games

#### File: `ex4-pokerDiceAll.js`

Dices in a [Poker Dice](https://en.wikipedia.org/wiki/Poker_dice) game have representations of playing cards upon them (this exercise uses strings instead). You play it with five such dices that you must throw in one go. In this exercise we have provided a ready-made `rollDice()` function for you that takes a dice number (1-5) as an argument and returns a promise that resolves to its final value, or a rejected promise with an `Error` object if the dice rolled off the table. The `rollDice()` function is located in a separate file (`pokerDiceRoller.js`). For this exercise you do not need to look at it (though you are welcome to), or understand how it works. The only thing you need to know is that it returns a promise, as described.

We have also provided some code that demonstrates how to handle throwing a single dice. For this exercise you should do the following:

- Refactor the `rollTheDices()` function to throw five dices in one go, making use of the `dices` array and `Promise.all()`.
- A successful (i.e. resolved) throw should output a message similar to:

  ```text
  Resolved! [ 'JACK', 'QUEEN', 'QUEEN', 'NINE', 'JACK' ]
  ```

- A unsuccessful (i.e. rejected) throw should output a message similar to:

  ```text
  Rejected! Dice 3 rolled off the table.
  ```

The provided `rollDice()` function outputs the state of a dice as it rolls, along with the time of day with millisecond accuracy. Once you have successfully completed this exercise you will notice that the intermediate messages are output in bursts of up to five at a time as the dices finish rolling asynchronously.

You may also notice that, in the case of a rejected promise, dices that have not yet finished their roll continue to do so. Can you explain why? Please add your answer as a comment to the end of the exercise file.
