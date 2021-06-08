# Homework Javascript Week 4

## Exercises

The homework for this week can be found in the `homework` folder.

> In this week we will be using a test library called [Jest](https://jestjs.io/) rather than using plain vanilla JavaScript as we did last week.
>
> For an introduction of Unit Testing with Jest we recommend the [Jest Crash Course - Unit Testing in JavaScript](https://youtu.be/7r4xVDI2vho) YouTube video from Traversy Media. For this week, please watch it up to the 0:21:24 time marker.

### Exercise 1: The odd ones out

**File:** `ex1-doubleEvenNumbers.test.js`

Look at the following code from the exercise:

```js
// ! Function to be test
function doubleEvenNumbers(numbers) {
  // TODO rewrite the function body using `map` and `filter`.
  const newNumbers = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      newNumbers.push(numbers[i] * 2);
    }
  }
  return newNumbers;
}

// ! Unit test (using Jest)
test('doubleEvenNumbers should take the even numbers and double them', () => {
  const actual = doubleEvenNumbers([1, 2, 3, 4]);
  const expected = [4, 8];
  expect(actual).toEqual(expected);
});
```

The `doubleEvenNumbers` function creates a new array by taking the even numbers from its `numbers` parameter (an array) and then doubling them. The resulting new array is returned as the function's return value.

A single unit test is provided. It consist of a call to the global `test()` function (provided by the Jest library) that is executed when you run the `npm test` command for this exercise. The Jest `test()` function takes two arguments:

1. A title string that describes what is being tested.
2. A callback function that is responsible for performing the actual test.

Inside the callback function we call the function to tested, passing to it the arguments relevant for the test at hand and saving its return value for subsequent inspection. The global Jest `expect()` function is then used to _assert_ that the returned value matches the expected value for this test.

#### Exercise instructions

Your task in this assignment is to rewrite the function body so that it uses the standard `.map()` and `.filter()` array methods to replace the existing loop-based implementation that pushes elements onto an array.

> Revising/improving a function without changing its externally observable behaviour is referred to as _refactoring_. The availability of one or more unit tests for the function to be refactored can help to ensure that the function still performs as expected after refactoring.

1. Use the `npm test` command on the unmodified exercise and observe that it passes the unit test.
2. Using the `.map()` and `.filter()` functions, rewrite the function body of `doubleEvenNumbers`.
3. Run `npm test` on the modified exercise and check that the unit test still passes (if not, fix the problem and try again).

Expected output from a successful unit test:

```console
 PASS  1-JavaScript/Week4/homework/ex1-doubleEvenNumbers.test.js
  ✓ doubleEvenNumbers should take the even numbers and double them (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.764 s, estimated 1 s
```

### Exercise 2: What's your Monday worth?

**File:** `ex2-mondaysWorth.test.js`

When you're a developer at a big company your Monday could look something like this:

```js
const mondayTasks = [
  {
    name: 'Daily standup',
    duration: 30, // specified in minutes
  },
  {
    name: 'Feature discussion',
    duration: 120,
  },
  {
    name: 'Development time',
    duration: 240,
  },
  {
    name: 'Talk to different members from the product team',
    duration: 60,
  },
];
```

Let's assume your hourly rate is €25.

```js
const hourlyRate = 25;
```

For this exercise you need to complete the provided `computeEarnings()` function. The provided unit tests give clues on what this function should do:

1. It should take two parameters (the `tasks` object and the hourly `rate`).
2. It should compute the earnings: a formatted Euro amount. The tests also gives away the expected answer: `'€187.50'`

```js
describe('computeEarnings', () => {
  test('should take two parameters', () => {
    // The `.length` property indicates the number of parameters expected by
    // the function.
    expect(computeEarnings).toHaveLength(2);
  });

  test('should compute the earnings as a formatted Euro amount', () => {
    const result = computeEarnings(mondayTasks, hourlyRate);
    const expected = '€187.50';
    expect(result).toBe(expected);
  });
});
```

#### Exercise instructions

1. Use the `npm test` command on the unmodified exercise and observe that both unit tests fail. (A green check mark indicates a _passed_ test, a red cross indicates a _failed_ test.)

   ```console
   FAIL  1-JavaScript/Week4/homework/ex2-mondaysWorth.test.js
     computeEarnings
       ✕ should take two parameters (3 ms)
       ✕ should compute the earnings as a formatted Euro amount (1 ms)

     ● computeEarnings › should take two parameters

       expect(received).toHaveLength(expected)

       Expected length:   2
       Received length:   0
       Received function: [Function computeEarnings]

         (stack trace omitted for brevity)

     ● computeEarnings › should compute the earnings as a formatted Euro amount

       expect(received).toBe(expected) // Object.is equality

       Expected: "€187.50"
       Received: undefined

      // stack trace omitted for brevity

   Test Suites: 1 failed, 1 total
   Tests:       2 failed, 2 total
   Snapshots:   0 total
   Time:        0.767 s, estimated 1 s
   ```

2. Add the expected parameters to the function parameter list. Leave the function body unchanged for now.

3. Run `npm test` again and observe that the first test now passes while the second one still fails.

   ```console
   FAIL  1-JavaScript/Week4/homework/ex2-mondaysWorth.test.js
     computeEarnings
       ✓ should take two parameters (2 ms)
       ✕ should compute the earnings as a formatted Euro amount (1 ms)

     ● computeEarnings › should compute the earnings as a formatted Euro amount

       expect(received).toBe(expected) // Object.is equality

       Expected: "€187.50"
       Received: undefined

       // stack trace omitted for brevity

   Test Suites: 1 failed, 1 total
   Tests:       1 failed, 1 passed, 2 total
   Snapshots:   0 total
   Time:        0.79 s, estimated 1 s
   ```

4. Complete the function body to return the computed earnings as a formatted Euro amount.

5. Run `npm test` again and check whether the second unit test now passes. If not, fix the problem and try again.

   ```console
   PASS  1-JavaScript/Week4/homework/ex2-mondaysWorth.test.js
     computeEarnings
       ✓ should take two parameters (1 ms)
       ✓ should compute the earnings as a formatted Euro amount (1 ms)

   Test Suites: 1 passed, 1 total
   Tests:       2 passed, 2 total
   Snapshots:   0 total
   Time:        0.768 s, estimated 1 s
   ```

> The practice of first writing unit tests and then writing the code that must pass the tests is called [Test Driven Development](https://www.freecodecamp.org/news/test-driven-development-what-it-is-and-what-it-is-not-41fa6bca02a2/):
>
> 1. We start off with writing unit tests that our target function should pass.
> 2. Next, we write a minimal implementation of the target function (e.g. the skeleton function from this exercise) that we know will fail the tests: all test results are output in red.
> 3. Then we write a minimal implementation that will pass the unit tests: all test results are output in green.
>
> Then, if desired, we refactor the function to make it more efficient, cleaner etc. Each time after we have made an improvement we rerun the unit tests to make sure that all test still pass. If not, we fix the problems until they do.

### Exercise 3: Lemon allergy

**File:** `ex3-lemonAllergy.js`

> In this exercise your job is to both complete the unit test function and the function to be tested itself.

Your mom bought you a basket of fruit, because you're doing so well in HackYourFuture. How sweet of her!

```js
const fruitBasket = [
  'apple',
  'lemon',
  'grapefruit',
  'lemon',
  'banana',
  'watermelon',
  'lemon',
];
```

However, she forgot that you are allergic to lemons! Let's quickly dispose of them before you get an attack. For that purpose we need to complete the function `sanitizeFruitBasket()`:

```js
// ! Function under test
function sanitizeFruitBasket(/* TODO parameter(s) go here */) {
  // TODO complete this function
}

// ! Unit tests (using Jest)
describe('sanitizeFruitBasket', () => {
  test('should take two parameters', () => {
    // TODO replace next line with your code
    expect(false).toBe(true);
  });

  test('should not modify the original `fruitBasket` array', () => {
    // Save the original contents of the fruit basket
    const originalFruitBasketContents = [...fruitBasket];
    // TODO replace next line with your code
    expect(false).toBe(true);
  });

  test('should return a new array that does not include the unwanted `lemon`', () => {
    // TODO replace next line with your code
    expect(false).toBe(true);
  });
});
```

As you can see, besides the `sanitizeFruitBasket()` function there are three skeleton unit tests that you need to complete. As a placeholder we have included a test that will always fail (as `false` can never become `true`).

The second unit test may need some clarification: we expect `sanitizeFruitBasket()` to be a _pure_ function, i.e. it should not mutate any data outside its own scope. In this case, that means that we expect that the original `fruitBasket` remains unmodified after it is passed as an argument to `sanitizeFruitBasket()`. For that purpose, we save the contents of `fruitBasket` to a new array (using _spread_ syntax) prior to calling `sanitizeFruitBasket()`. After calling `sanitizeFruitBasket()` we can then assert that the contents of `fruitBasket` still matches the contents we saved earlier. **Hint**: use the [`.toEqual()`](https://jestjs.io/docs/expect#toequalvalue) Jest matcher.

#### Exercise instructions

1. Run `npm test` and observe that all unit tests fail.

2. Try and complete the unit tests first. Then run `npm test` again: the unit test should still fail.

3. In an iterative process, implement the `sanitizeFruitBasket()` function, perhaps by first adding the expected parameters and running the tests again.

4. Complete the function-under-test and the unit tests until you are satisfied that all is performing as expected.

### Exercise 4: Observable

**Folder:** `ex4-observable`

> In previous exercises we combined the function to be tested and the unit test code in a single file. This was done for introductory purposes but it is not how it is done in practice. In practice we should have our unit tests as separate files and that is what we will do from now on.
>
> Unit tests should be run during development and maintenance only, using a test runner such as Jest (when you run `npm test` in this repo Jest is executed behind the scenes). When using unit tests (not all projects do) it is the developers responsibility to ensure that all tests pass before deploying the application code operationally. Note also that the `describe()`, `test()` and `expect()` global functions exist only in the Jest execution context. Elsewhere, e.g. when trying to run them directly in Node.js, these functions are non-existent and you will experience runtime errors, e.g. `ReferenceError: test is not defined`.

A software pattern that you may encounter in the future is a construct called the **Observer Pattern**. It enables **subscribers** (which are usually functions) to **subscribe** to **notifications** from an **observable**. Any number of subscribers can subscribe.

Consider the code below (from `ex4-observable.js`):

```js
function createObservable() {
  const subscribers = [];
  return {
    subscribe: function (subscriber) {
      // TODO complete this function
    },
    notify: function (message) {
      // TODO complete this function
    },
  };
}
```

The `createObservable()` function returns an object with two function properties, `subscribe` and `notify`. In this exercise you are required to complete them.

The file `main.js`, listed below, demonstrates a minimal example use case of the `createObservable()` function.

```js
const createObservable = require('./ex4-observable');

// A candidate subscriber function
function consoleUpperCase(message) {
  console.log(message.toUpperCase());
}

// Another candidate subscriber function
function consoleLowerCase(message) {
  console.log(message.toLowerCase());
}

// Create an observable object
const observable = createObservable();

// Add three subscribers
observable.subscribe(console.log);
observable.subscribe(consoleUpperCase);
observable.subscribe(consoleLowerCase);

// Send a message to all current subscribers
observable.notify("Let's see what happens here!");
```

Because the `createObservable()` function resides in another file we first need to obtain a reference to it by calling the Node.js `require()` function and saving the reference to a `const` variable. (You will learn more about Node.js in the Node curriculum module. Note that the `ex4-observable.js` file "exports" the `createObserver` function.)

In `main.js`, we first create two example functions that log their argument to the console after modifying it (upper case, lower case).

Next, we call `createObservable()` to create an `observable` object.

We then subscribe three functions to the `observable` object by passing these functions as arguments to the object's `.subscribe()` method. Note that one of these functions is the standard `console.log` which outputs its argument unmodified.

Finally, we call the `.notify()` method on the `observable` object, passing a message (in this case a string) that we expect to be sent to all subscriber functions. Each of our example subscriber functions logs the message to the console in it own fashion (unmodified, in upper case, in lower case). In the _finished_ exercise the output should look like this (using `npm run it`).

```console
Let's see what happens here! (console.log subscriber)
LET'S SEE WHAT HAPPENS HERE! (consoleUpperCase subscriber)
let's see what happens here! (consoleLowerCase subscriber)
```

> The main purpose of this exercise is to demonstrate an application of closures and higher order functions. But let's look a bit deeper at the Observer Pattern itself. The Observer Pattern allows "listeners" to dynamically (i.e., at runtime) subscribe to notifications of "publishers". It is said that the "listeners" are "loosely coupled" to the "publisher". This is different from hard-coding calls to specific listener functions inside the code of the "publisher"; this would be called "tightly coupled".
>
> In the Browser module you will learn how to add "event listeners" to DOM elements such as HTML buttons, which you may have seen in passing already. This is an example of an Observer Pattern implementation.

#### Running the Unit Tests

This time we have provided the unit tests in a separate file called `ex4-observable.test.js`. You should not modify this file, nor is it necessary to fully understand how it works at this stage. However, we will try to give an explanation here all the same.

The first two unit tests in the file will pass already on the unmodified exercise (lucky you!).

```js
const createObservable = require('./ex4-observable');

describe('createObservable', () => {
  test('should exist and be a function', () => {
    expect(typeof createObservable).toBe('function');
  });

  test('should return an object with `subscribe` and a `notify` function properties', () => {
    const observable = createObservable();
    expect(typeof observable).toBe('object');
    expect(typeof observable.subscribe).toBe('function');
    expect(typeof observable.notify).toBe('function');
  });

  ...
});
```

The third unit test tests the "beef" of this exercise: your implementation of the methods `subscribe()` and `notify()`.

```js
describe('createObservable', () => {
  ...

  test('should notify all subscribers of any notification', () => {
    const observable = createObservable();

    // Create two mocked listener functions
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    // Subscribe both function to the observable
    observable.subscribe(listener1);
    observable.subscribe(listener2);

    // Notify all subscribers with a Hi! message
    observable.notify('Hi!');

    // Assert that both listeners have been called with the Hi! message
    expect(listener1).toHaveBeenCalledWith('Hi!');
    expect(listener2).toHaveBeenCalledWith('Hi!');
  });
});

```

The `listener1` and `listener2` variables are each assigned a Jest "mock" function. We can use such functions in place of actual production functions to observe their usage during a unit test. In this case we are interested whether these functions are called with a notification message if we subscribe them to an observable. After the `.notify()` method is called we `expect` both listeners to have been called with the string that was passed as an argument to `.notify()`.

#### Exercise instructions

Complete the `createObservable()` function as follows:

- The `subscribe` function should take the function passed to it as an argument and push it onto the `subscribers` array. (Yes, you can store functions in an array. Functions are treated in JavaScript like any other value.)

- The `notify` function should iterate through, and call, all subscribers from the `subscribers` array, passing on the notification message to each subscriber.

To see your implementation in action, use `npm run it` to run exercise (the `main.js` file will be executed).

To test your implementation with the Jest unit tests, run `npm test`. This will run the tests in `ex4-observable.test.js`.

### Exercise 5: Transfer into Wallet

#### Folder: `ex5-wallet`

In this exercise we will practice using the Chrome debugger. Other browsers, such as FireFox, Edge and Safari have similar tools but the exact look and feel may be different.

At the end of the `index.js` file of the exercise you will find a `quiz` object with multiple-choice questions that we would like you to complete as you follow along with the instructions below.

> Read more about debuggers in general in the Study Guide: [Debuggers](https://hackyourfuture.github.io/study/#/tools/debuggers)
>
> For an external tutorial on how to use the Chrome debugger, check out: [The definitive guide to JavaScript Debugging [2021 Edition]](https://dev.to/atapas/the-definitive-guide-to-javascript-debugging-2021-edition-116n).

Here is a listing of the code in `index.js` (minus the `quiz` object) we will be working with:

```js
const eurosFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
});

function createWallet(name, cash = 0) {
  function deposit(amount) {
    cash += amount;
  }

  function withdraw(amount) {
    if (cash - amount < 0) {
      console.log(`Insufficient funds!`);
      return 0;
    }

    cash -= amount;
    return amount;
  }

  function transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${name} to ${
        wallet.name
      }`
    );
    const withdrawnAmount = withdraw(amount);
    wallet.deposit(withdrawnAmount);
  }

  function reportBalance() {
    console.log(`Name: ${name}, balance: ${eurosFormatter.format(cash)}`);
  }

  const getName = () => name;

  return {
    deposit,
    withdraw,
    transferInto,
    reportBalance,
    getName,
  };
}

const walletJack = createWallet('Jack', 100);
const walletJoe = createWallet('Joe', 10);
const walletJane = createWallet('Jane', 20);

walletJack.transferInto(walletJoe, 50);
walletJane.transferInto(walletJoe, 25);

walletJane.deposit(20);
walletJane.transferInto(walletJoe, 25);

walletJack.reportBalance();
walletJoe.reportBalance();
walletJane.reportBalance();
```

Since this is a browser-based exercise, the file `index.js` will be loaded via a `<script>` tag in `index.html`. The `index.html` file itself requires no further consideration here.

Let's run the exercise using our convenience command `npm run it`:

```console
❯ npm run it

> javascript@1.0.0 it C:\Users\jimcr\dev\hackyourfuture\homework
> node ./test-runner/run-it

? Rerun last test (1-Javascript, Week4, ex5-wallet)? No
? Which module? 1-Javascript
? Which week? Week4
? Which exercise? ex5-wallet
Running exercise, please wait...
HTTP server running at http://localhost:3030
Press Ctrl-C to exit.
```

This will run the exercise in the default browser (if your default browser is not Chrome then open this URL manually in Chrome: `http://locahost:3030`).

Next, open the Developer Tools by pressing function key <kbd>F12</kbd> and examine the console output. It will look like this:

```console
Transferring € 50,00 from Jack to undefined
Transferring € 25,00 from Jane to undefined
Insufficient funds!
Transferring € 25,00 from Jane to undefined
Name: Jack, balance: € 50,00
Name: Joe, balance: € 85,00
Name: Jane, balance: € 15,00
```

We seem to have a bug because we get `undefined` where we expect a name.

Open the **Sources** panel from Developer Tools. Select `index.js` from the explorer panel and make sure that the console output is visible in the bottom panel, as shown in Figure 1.

> ![Dev Tools Debugger](../../assets/dev-tools-debugger.png)
>
> Figure 1. The Chrome Developer Tools Debugger.

First let's examine what causes the `undefined` value in the message. The `console.log` that outputs that message starts on line 26. We would like to inspect the state of the program when the execution reaches that point. For that purpose we will place a **breakpoint** at line 26. A breakpoint is a location in our code where we would like the JavaScript engine to pause execution when we run the program with the debugger.

To place a breakpoint at line 26, click to the left of the number 26 in the left margin of the editor window. A blue marker will appear to indicate the presence of a breakpoint (Figure 2):

> ![Breakpoint at line 26](../../assets/wallet-breakpoint-26.png)
>
> Figure 2. Breakpoint placed at line 26.

With this breakpoint set, reload the page to rerun the JavaScript code. The execution will be paused at line 26, as indicated by the blue highlighting of that line:

> ![Breakpoint hit](../../assets/wallet-hit-26.png)
>
> Figure 3. Breakpoint at line 26 is hit.

To the right of the code panel you can inspect, amongst others, **Breakpoints**, **Scope** and the **Call Stack**.

:question: Please answer questions **q1** and **q2** in the `quiz` object.

When we expand the variable `wallet` in the local scope of the Scope panel, we can see that it contains the following properties (all functions):

- `deposit`
- `getName`
- `reportBalance`
- `transferInto`
- `withdraw`

There is no `name` property there. That must be the reason why we get `undefined` when we try to access `wallet.name`. Let's examine this by instructing the debugger to step over (i.e. execute) the `console.log` function call. Figure 4 below shows the debug buttons located near the upper right corner of the Developer Tools.

> ![Debug buttons](../../assets/dev-tools-debug-buttons.png)
>
> Figure 4. Developer Tools debug buttons

Hover the mouse over each of these buttons in the browser and take note of the tooltips that appear.

:question: Please answer question **q3** of the `quiz` object.

Press the button **Step over next function call**. As you can see the execution is now stopped at line 31. The whole function call, which spans (due to Prettier) four lines is executed and stepped over. If we examine the console at the bottom of the screen we can see that the variable `name` is displayed correctly, but `wallet.name` is `undefined`. That is, as we saw earlier in the Scope panel, because a`wallet`object doesn't include a`name` property.

The `name` variable, as well as the `cash` variable were intentionally made _private_ to each instance of a `wallet` object, by means of a _closure_. This to avoid that external code, accidentally or with malicious intent, changes the name of the wallet owner or change its cash amount. This holds true even for other instances of wallet objects.

However, we _do_ want to give some form of **read-only** access to the information these variables hold. For this purpose the `wallet` object provides two functions, `reportBalance()` and `getName()`, that _do_ have access to the "_closed-in_" variables (or actually, in this case, _parameters_) `name` and `cash`. We can therefore fix the `undefined` bug by replacing `wallet.name` with `wallet.getName()`.

Let's try and make that change in the VSCode editor window. Prettier will probably now cause the `console.log` call to span five lines.

Now, with the breakpoint still set at line 26, reload the page (first click the large X to cancel loading the current page and then the reload button to reload the page). Then, step over the `console.log` and inspect the console.

:question: Please answer question **q4** of the quiz object.

With execution paused at (now) line 31, press the **Step into next function call** button. If all is well that should take us into the function `withdraw()`, which is being called from line 31. If you hover your mouse over the variables `cash` and `amount` on line 31 you can peek at their current values, respectively `100` and `50`: that should be sufficient to make the withdrawal successful.

Let's add a breakpoint at line 17. That breakpoint will only be hit in the case of insufficient funds. Press the button **Step over next function call**. What is being stepped over here is not a function call but a statement. So maybe this button is better labelled "Step over next statement"... But we will have to make do with what we got.

In any case, the `console.log` of line 17 was not executed, as we expected.

With the `undefined` problem solved, we would now like to examine the instances where we get the message `Insufficient funds!`. The breakpoint at line 17 is perfect for that. But we no longer need the breakpoint at line 26. Click on that breakpoint in the left margin of the editor window to remove it again.

Now, let's resume execution of the code by pressing the button **Resume script execution**. Our breakpoint at line 17 will be hit. Inspect the Scope panel to determine the name of the owner of the wallet that has insufficient funds.

:question: Please answer question **q5** of the `quiz` object.

Press the **Resume script execution** again. The program will now run to completion without issues.

Having answered all questions, it is now time to run a test to check whether you provided the correct answers. Run the test command with:

```console
npm test
```

and select to rerun the previous exercise. Note that the test will not use the browser.

If you have provided all the correct answers you will see:

```console
All unit tests passed.
```

Otherwise you will get a message in red for each incorrect answer:

```console
*** Unit Test Error Report ***

- wallet q1: At line 26, which variables are in the scope marked Closure?
- wallet q2: What is in the Call Stack, from top to bottom?
- wallet q3: What tooltip appears when hovering over the third debug button?
- wallet q4: What is displayed in the console?
- wallet q5: The owner of the wallet with insufficient funds is:
```

This concludes the exercise.
