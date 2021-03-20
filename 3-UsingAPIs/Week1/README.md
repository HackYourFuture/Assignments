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

getAnonName('John', console.log);
```

Rewrite this function, but replace the callback syntax with the Promise syntax:

- Have the `getAnonName` arrow function return a `new Promise`.
- If the Promise resolves, pass the full name as an argument to `resolve()`.
- If the Promise rejects, pass an `Error` object containing "You didn't pass in a first name!" to `reject()`.

### Exercise 2: Is it a double digit number?

#### File: `checkDoubleDigits.js`

Complete the function called `checkDoubleDigits` such that:

- It takes one argument: a number
- It returns a `new Promise`.
- If the number is between 10 and 99 it should resolve to the string "This is double digit number!".
- For any other number it should reject with an an Error object containing: "Expected a double digit number but got `number`", where `number` is the number that was passed as an argument.

### Exercise 3: Roll a dice

### File `ex3-rollDice.js`

This exercise is about throwing a dice. A dice in this exercise may roll up to 10 times before it settles on a final value, depending on the "energy" with which it is thrown. Unfortunately, if a dice rolls more than six times in our game it rolls off the table and the throw becomes invalid. If it rolls six times or less, its final value will be valid.

> Note: to keep things simple, we have taken some liberties in this exercise with respect to how a dice behaves in reality. For instance, in real life a dice cannot flip back to a value it previously had. And it will mostly roll on its corners, not its sides.

The existing `rollDice()` function in the exercise file uses a callback to notify the caller of success or failure. Here is the code:

```js
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
```

> A couple of comments about this code:
>
> - In real life, a dice, when thrown, will autonomously run its course until it comes to a complete standstill, abiding the laws of nature. How long it will roll depends on the force of the throw. In our simulation that "force" is represented by the random value assigned to `randomRollsToDo`. As if subjected to the laws of nature, we insist that our simulated dices continue to roll until they have reached their randomly assigned number of rolls-to-do, even after dropping of the table.
> - The "error first" callback format used in this example, using two parameters, is commonly used in Node.js. To communicate back _failure_, the callback is called with a _single_ argument: the error value (usually a JavaScript `Error` object). In the _successful_ case the callback is called with _two_ arguments, the first one being `null` (i.e., no error) and the second one containing the actual result.

Here is what the output could look like for a successful throw:

```text
❯ node .\ex3-rollDice.js
Dice scheduled for 5 rolls...
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
Dice scheduled for 8 rolls...
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

Since we want to practice with promises anyway, let's see what happens when we refactor the code to use promises:

- Run the unmodified program and confirm that the problem as described can be reproduced.
- Refactor the `rollDice()` function from using a callback to returning a promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that calls `rollDice()` to use the returned promise.
- Does the problem described above still occur? If not, what would be your explanation? Add your answer as a comment to be bottom of the file.

#### Bonus: Event Loop Experiments

> The event loop in JavaScript is not that easy to comprehend. But having a good grasp of how it works is vital for you to better understand how asynchronous code works. We will examine the event loop in the experiment below. If you are still left puzzled, we invite you to discuss it with your class mates on Slack and see if you can work it out together.

So what do you think the JavaScript engine is doing while it is waiting for a `setTimeout()` to fire? Well, since it has nothing else waiting for it to do on its call stack, it is just sitting idle.

Lets give the JavaScript engine something more to do. Paste this code just above the `module.exports` line:

```js
function wasteTimeBlocking() {
  for (let count = 1; count <= 1000; count++) {
    console.log('  count =', count);
  }
}
wasteTimeBlocking();
```

When we now execute the exercise, the JavaScript engine first calls the `rollDice()` function. This function returns immediately after having executed the first roll while scheduling the next roll to run 500ms later via a `setTimeout()`.

Next, the JavaScript engine will call the `wasteTimeBlocking()` function. As you can see, this is literally a waste of time :grin:. It is also blocking the JavaScript engine as the next scheduled `rollDice()` cannot occur before `wasteTimeBlocking()` has returned. You can observe this from the console output:

```text
Dice scheduled for 4 rolls...
Dice value is now: 3
  count = 1
  count = 2
  ...
  count = 1000
Dice value is now: 6
Dice value is now: 5
Dice value is now: 6
Success! Dice settled on 6.
```

> :bulb: If you have a large amount of console output to inspect, you can maximize the VSCode terminal panel by pressing the up-arrow button in the top-right of the panel, as shown in Figure 1 below:
>
> ![Maximize Terminal Panel](../../assets/maximize-terminal.png)
>
> Figure 1. Maximize the Terminal Panel

Try and increase the `count` limit in the `for` loop from `1000` to, say, `10000`, to take this to the extreme. Despite the timer firing after 500ms, the next scheduled `rollDice()` will only occur far later than that. This is because the `wasteTimeBlocking()` function blocks the JavaScript engine from doing anything else while it is executing: the function remains on the call stack until it returns, preventing the JavaScript engine to pick pending events (our scheduled `rollDice`) to run next.

Let's now replace the experimental `wasteTimeBlocking` code with a non-blocking version:

```js
function wasteTime() {
  let count = 0;
  const timer = setInterval(() => {
    count += 1;
    console.log('count =', count);
    if (count > 100) {
      clearInterval(timer);
    }
  }, 0);
}
wasteTime();
```

While still wasting (tiny bits of) time, this version does so in a non-blocking fashion, by scheduling the next iteration through the event loop. Setting the interval time to zero causes the event loop to immediately (i.e. without delay) pick up the next pending event once the call stack is empty. If you run this version you will observe that the output from `rollDice()` is interspersed with output from `wasteTime()`:

```text
Running exercise, please wait...
Dice scheduled for 4 rolls...
Dice value is now: 5
count = 1
count = 2
...
count = 73
Dice value is now: 4
count = 74
count = 75
...
count = 101
Dice value is now: 1
Dice value is now: 4
Success! Dice settled on 4.
```

As you can observe, the time between executions of `rollDice()` is 500ms, or perhaps one or two milliseconds later, but not much later than that.

### Exercise 4: Throw the dices for a Poker Dice game

#### File: `ex4-pokerDiceAll.js`

Dices in a [Poker Dice](https://en.wikipedia.org/wiki/Poker_dice) game have representations of playing cards upon them (this exercise uses strings instead). You play it with five such dices that you must throw in one go. In this exercise we have provided a ready-made `rollDice()` function for you that takes a dice number (1-5) as an argument and returns a promise that resolves to its final value, or a rejected promise with an `Error` object if the dice rolled off the table. The `rollDice()` function is located in a separate file (`pokerDiceRoller.js`). For this exercise you do not need to look at it, although you are welcome to do so. The only thing you need to know is that it returns a promise, as described above.

We have also provided some code that demonstrates how to handle throwing a single dice. For this exercise you should do the following:

- Refactor the `rollTheDices()` function to throw five dices in one go, making use of the `dices` array and `Promise.all()`.
- A successful (i.e. resolved) throw should output a message similar to:

  ```text
  Resolved! [ 'JACK', 'QUEEN', 'QUEEN', 'NINE', 'JACK' ]
  ```

- An unsuccessful (i.e. rejected) throw should output a message similar to:

  ```text
  Rejected! Dice 3 rolled off the table.
  ```

The provided `rollDice()` function logs the value of a dice as it rolls, time-stamped with the time of day (with millisecond accuracy) to the console. Once you have successfully completed this exercise you will notice that the intermediate messages are output in bursts of up to five at a time as the dices finish rolling asynchronously.

You may also notice that, in the case of a rejected promise, dices that have not yet finished their roll continue to do so. Can you explain why? Please add your answer as a comment to the end of the exercise file.
