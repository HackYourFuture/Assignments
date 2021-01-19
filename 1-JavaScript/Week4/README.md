# Homework Javascript Week 4

## Exercises

The homework for this week can be found in the `homework` folder.

### Exercise 1: The odd ones out

**File:** `ex1-doubleEvenNumbers.js`

Look at the following code snippet:

```js
function doubleEvenNumbers(numbers) {
  const newNumbers = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      newNumbers.push(numbers[i] * 2);
    }
  }
  return newNumbers;
}

const myNumbers = [1, 2, 3, 4];
console.log(doubleEvenNumbers(myNumbers)); // Logs "[4, 8]" to the console
```

The `doubleEvenNumbers` function returns only the even numbers in the array `myNumbers` and doubles them. While this code works as advertised we would like to use a more _functional_ approach.

Let's rewrite it (or _refactor_ it, as professional developers would call it):

- Using the `map` and `filter` functions, rewrite the function body of `doubleEvenNumbers`.

### Exercise 3: What's your Monday worth?

**File:** `ex3-mondaysWorth.js`

When you're a developer at a big company your Monday could look something like this:

```js
const mondayTasks = [
  {
    name: "Daily standup",
    duration: 30, // specified in minutes
  },
  {
    name: "Feature discussion",
    duration: 120,
  },
  {
    name: "Development time",
    duration: 240,
  },
  {
    name: "Talk to different members from the product team",
    duration: 60,
  },
];
```

Let's assume your hourly rate is €25. How much would you earn on that day?

- Complete the function names `computeEarnings`. It should take an array of tasks and an hourly rate as arguments and return a formatted Euro amount (e.g: `€11.34`) comprising the total earnings.
- Use the `map` array function to take out the duration time for each task.
- Multiply each duration by a hourly rate for billing and sum it all up.
- Make sure the program can be used on any array of objects that contain a `duration` property with a number value.

### Exercise 4: Publish and Subscribe

**File:** `ex4-publishSubscribe.js`

A software pattern that you may encounter in the future is a construct called the **Observer Pattern**. It enables **listeners** (which are usually functions) to **subscribe** to **notifications** from a **publisher**. Any number of listeners can subscribe.

Consider the code below (from `ex4-publishSubscribe.js`):

- The call to the `createPublisher` function returns an object. For ease of reference, let's call it a **Publisher** object here. The **Publisher** object has two properties, `subscribe` and `notify`, which are both functions. In this exercise you are required to complete them. (But continue reading first.)

- As you can see below, the `createPublisher` function is called and the resulting Publisher object is assigned to the `myPublisher` variable.

- Next, two **listener** functions are defined, notably `consoleUpperCase` and `consoleLowerCase`. A listener function is defined here as a function that takes a single parameter, `message`. It is up to the listener what to do with `message`. (The **Publisher** has no say in this!).

- The **listener** functions are added as **subscribers** to `myPublisher` by calling its `subscribe` function. The `subscribe` function should take the function passed to it as an argument and push it onto the `listeners` array. (Yes, you can store functions in an array. Functions are treated in JavaScript like any other value. See [First-class Function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function) in MDN Web Docs.)

- The standard `console.log` function, which also conforms to the minimum requirement for a **listener** (although it can take more than one argument) is also added as a subscriber.

- Finally, a call to the Publisher's `notify` function is expected to iterate through, and call, all subscribers from the `listeners` array, relaying the notification message to each listener.

Good luck with completing `createPublisher`!

```js
function createPublisher() {
  const listeners = [];
  return {
    subscribe: function (/* parameter(s) go here */) {
      // TODO: complete this function
    },
    notify: function (/* parameter(s) go here */) {
      // TODO: complete this function
    },
  };
}

const myPublisher = createPublisher();

function consoleUpperCase(message) {
  console.log(message.toUpperCase());
}

function consoleLowerCase(message) {
  console.log(message.toLowerCase());
}

myPublisher.subscribe(consoleUpperCase);
myPublisher.subscribe(consoleLowerCase);
myPublisher.subscribe(console.log);

myPublisher.notify("Let's see what happens here!");
// Print the following to the console
// "LET'S SEE WHAT HAPPENS HERE!"
// "let's see what happens here!"
// "Let's see what happens here!"
```
