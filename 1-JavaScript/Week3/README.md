# Homework Javascript Week 3

The homework for this week can be found in the `homework` folder.

## Exercises

Starter code for all exercises is located in the `homework` folder. Modify the starter code so that the requirements of the exercise are met. At the bottom of some of the exercise files you will see a code snippet similar to:

```js
// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
module.exports = giveCompliment;
```

The code calls the `main()` function from the exercise _unless the exercise is being tested with the automated test runner provided with this repo_ (see later in this README). Do not delete or modify this code snippet.

### Exercise 1: You are amazing

**File**: `ex1-giveCompliment.js`

1. Complete the function named `giveCompliment`as follows:

   - It should take a single parameter: `name`.
   - Its function body should include a variable that holds an array, `compliments`, initialized with 10 strings. Each string should be a compliment, like `"great"`, `"awesome"` and so on.
   - It should randomly select a compliment from the array.
   - It should return the string _"You are `compliment`, `name`!"_, where `compliment` is a randomly selected compliment and `name` is the name that was passed as argument to the function.

2. Call the function three times, giving each function call the same argument: your name. Use `console.log` each time to display the return value of the `giveCompliment` function to the console.

### Exercise 2: Dog years

**File**: `ex2-dogYears.js`

You know how old your dog is in human years, but what about dog years? Let's calculate it!

1. Complete the function named `calculateDogAge`.

   - It takes one parameter: your (fictional) puppy's age (number).
   - Calculate your dog's age based on the conversion rate of 1 human year to 7 dog years.
   - Return a string: _"Your doggie is `age` years old in dog years!"_

2. Use `console.log` to display the result of the function for three different ages.

### Exercise 3: Be your own fortune teller

**File**: `ex3-tellFortune.js`

Why pay a fortune teller when you can just program your fortune yourself?

1. Create four arrays inside the function `main`, `numKids`, `partnerNames`, `locations` and `jobTitles`. Give each array five random values that have to do with the name of the variable.

2. Complete the function `selectRandomly`. This function should take an array as a parameter and return a randomly selected element as its return value.

3. Complete the function named `tellFortune` as follows:

   - It should take four parameters (in the order listed): the array with the options for the number of children, the array with the options for the partner's name, the array with the options for the geographic location and the array with the options for the job title.
   - It should use the `selectRandomly` function to randomly select values from the arrays.
   - It should return a string: _"You will be a `jobTitle` in `location`, married to `partnerName` with `numKids` kids."_

4. Call the function three times, passing the arrays as arguments. Use `console.log` to display the results.

Note: The DRY principle is put into practice here: instead of repeating the code to randomly select array elements four times inside the `tellFortune` function body, this code is now written once only in a separate function.

### Exercise 4: Shopping at the supermarket

#### File: `ex4-shoppingCart.js`

Let's do some grocery shopping! We're going to get some things to cook dinner with. However, you like to spend money and always buy too many things. So when you have more than 3 items in your shopping cart the first item gets taken out.

> The exercise file includes pre-supplied code to automatically test that your code works correctly. Such a test is called a **unit test**. In this exercise the unit test is written in "plain vanilla" JavaScript (i.e., pure JavaScript without making use of external libraries). It uses [console.assert()](https://developer.mozilla.org/en-US/docs/Web/API/console/assert) to assert that a given condition is true.
>
> Later, in Week 4, we will introduce the Jest library that provides a more convenient way of writing and executing unit tests.

#### Exercise instructions

1. Create an array called `shoppingCart` that holds the following strings: `"bananas"` and `"milk"`.

2. Complete the function named `addToShoppingCart` as follows:

   - It should take one parameter: a grocery item (string)
   - It should add the grocery item to `shoppingCart`. If the number of items is more than three remove the first one in the array.
   - It should return a string "You bought _\<list-of-items>_!", where _\<list-of-items>_ is a comma-separated list of items from the shopping cart array.

3. Confirm that your code passes the unit tests (see below).

#### Unit tests

The code listing below shows the plain vanilla JavaScript unit tests that are provided for this exercise. There are five separate tests, each one focussing on an expected characteristic or behaviour of the function to be tested. Each test is made up of the following parts:

1. A `console.log` message that describes what the test is about.
2. A definition of the expected value that the function-under-test should return.
3. A call to the function-under-test, supplying the arguments that should produce the expected result.
4. A `console.assert()` that asserts that the actual result matches the expected result.

```js
function test1() {
  console.log(
    'Test 1: addShoppingCart() called without an argument should leave the shopping cart unchanged'
  );
  const expected = 'You bought bananas, milk!';
  const actual = addToShoppingCart();
  console.assert(actual === expected);
}

function test2() {
  console.log('Test 2: addShoppingCart() should take one parameter');
  const expected = 1;
  const actual = addToShoppingCart.length;
  console.assert(actual === expected);
}

function test3() {
  console.log('Test 3: `chocolate` should be added');
  const expected = 'You bought bananas, milk, chocolate!';
  const actual = addToShoppingCart('chocolate');
  console.assert(actual === expected);
}

function test4() {
  console.log('Test 4: `waffles` should be added and `bananas` removed');
  const expected = 'You bought milk, chocolate, waffles!';
  const actual = addToShoppingCart('waffles');
  console.assert(actual === expected);
}

function test5() {
  console.log('Test 5: `tea` should be added and `milk` removed');
  const expected = 'You bought chocolate, waffles, tea!';
  const actual = addToShoppingCart('tea');
  console.assert(actual === expected);
}

function test() {
  test1();
  test2();
  test3();
  test4();
  test5();
}

test();
```

When running the unmodified exercise we expect all assertions to _fail_:

```console
Test 1: addShoppingCart() called without an argument should leave the shopping cart unchanged
Assertion failed
Test 2: addShoppingCart() should take one parameter
Assertion failed
Test 3: `chocolate` should be added
Assertion failed
Test 4: `waffles` should be added and `bananas` removed
Assertion failed
Test 5: `tea` should be added and `milk` removed
Assertion failed
```

> From MDN Web Docs [console.assert()](https://developer.mozilla.org/en-US/docs/Web/API/console/assert):
>
> _The console.assert() method writes an error message to the console if the assertion is false. If the assertion is true, nothing happens._
>
> ```js
> console.assert(assertion, msg);
> ```
>
> `assertion` is any boolean expression. If the assertion is false, the message is written to the console.
>
> (In Node.js, if `msg` is omitted, the default message "Assertion failed" will be used.)

When the function-under-test is correctly implemented we expect all assertions to _pass_ (i.e., the `console.assert` statements will remain silent).

```console
Test 1: addShoppingCart() called without an argument should leave the shopping cart unchanged
Test 2: addShoppingCart() should take one parameter
Test 3: `chocolate` should be added
Test 4: `waffles` should be added and `bananas` removed
Test 5: `tea` should be added and `milk` removed
```

### Exercise 5: Improved shopping at the supermarket

#### File: `ex5-shoppingCartPure.js`

From a _best practice_ point of view, there is a big problem with the code of the previous exercise: it modifies (_"mutates"_) a global variable. In larger code bases this can become problematic as it will be difficult to track down places in the code that might also (unexpectedly) mutate the global variable. Conversely, there might be yet other code, tucked away somewhere else, that expects the variable to remain constant. Global variables (other than those that are truly and explicitly understood to be constant) are best avoided.

A function that mutates a global variable or in some other way interacts with the "_outside world_" (e.g. accessing a database, making a network request, or even logging something to the console) is said to cause _"side effects"_. Sometimes this is necessary. A program that does not in some way affect the outside world cannot possibly do something useful. However, in all other cases side-effects are best avoided.

Experienced developers therefore prefer to work with _pure functions_. Pure functions do not access (let alone, _mutate_) any data that exists outside of their own scope and returns results solely through the function's return value. All required data is expected to be passed through its parameter list.

A key characteristic of a pure function is that if it is repeatedly called with the same arguments it always produces the same result. This is clearly not the case with the `addToShoppingCart()` function of the previous exercise.

In the current exercise we will rewrite the `addToShoppingCart` function to make it _pure_. Do the following:

1. Complete the parameter list of `addToShoppingCart()`. As a first parameter it should accept a shopping cart array and as a second parameter it should accept a grocery item to be added.
2. The function should return a _new_ shopping cart array, following the same rule as in the previous exercise: it should contain a maximum of three items.
3. The shopping cart passed as an argument should not be modified.
4. When constructing the new shopping cart array you should make use of the ES5 _spread_ syntax.<br>See also [Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) on MDN Web Docs.
5. Confirm that you function passes the provided unit tests.

### Exercise 6: Total cost is

#### File: `ex6-totalCost.js`

> In this exercise you need to complete both a _function-under-test_ as well as two separate unit test functions to test the correctness of the function-under-test.

You want to buy a couple of things from the supermarket to prepare for a party. After scanning all the items the cashier wants to give you the total price, but the machine is broken! Let's write her a _function_ that does it for her instead!

The starter code for the exercise is as shown below:

```js
const cartForParty = {
  // TODO complete this object
};

function calculateTotalPrice(/* TODO parameter(s) go here */) {
  // TODO replace this comment with your code
}

function test1() {
  console.log('\nTest 1: calculateTotalPrice should take one parameter');
  // TODO replace this comment with your code
}

function test2() {
  console.log('\nTest 2: return correct output when passed cartForParty');
  // TODO replace this comment with your code
}

function test() {
  test1();
  test2();
}

test();
```

#### Exercise instructions

1. Create an object named `cartForParty` with five properties. Each property should be a grocery item (like `beer` or `chips`) and hold a number value (like `1.75` or `0.99`).

2. Write a function called `calculateTotalPrice`.

   - It takes one parameter: an object that contains properties that only contain number values.
   - Loop through the object and add all the number values together.
   - Return a string: _"Total: €`amount`"_.

3. Complete the unit test functions and verify that all is working as expected.

### Exercise 7: Mind the privacy

#### File: `ex7-mindPrivacy.js`

Look at the following data maintained by the HR department:

```js
const employeeRecords = [
  {
    name: 'John',
    occupation: 'developer',
    gender: 'M',
    email: 'john.doe@somewhere.net',
    salary: 50000,
  },
  {
    name: 'Jane',
    occupation: 'manager',
    gender: 'F',
    email: 'jane.eyre@somewhere.net',
    salary: 60000,
  },
];
```

Sometimes it is necessary for the HR department to share employee records with other departments. However, it should respect the privacy of the employees and never give out data that is considered private. Usually, `salary` is considered private and let's for the sake of argument also consider `gender` private. So when the HR department sends out the data it should create a new array with objects that just contains the `name`, `occupation` and `email` properties.

You should do the following:

1. Complete the `filterPrivateData()` function. It should take a single parameter: the array of employee records.
2. It should create a _new_ array, containing employee data without the private data.
3. Use [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring) to extract the non-private properties from an employee record (an `object`) and [object literal shorthand](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#property_definitions) to create a new employee record with just the non-private parts (`name`, `occupation` and `email`).
4. Return the new array as the return value of the function.
5. Run the exercise and verify that it passes all the unit tests.

#### Note: Comparing Objects

In the second unit test (see below) we need to compare the returned object against the result we expect (also an object). We cannot simply use an equality comparison operator (strict or non-strict) to compare the two objects. The variables `expected` and `result` reference different objects and therefore a direct comparison `expected === result` will always be false.

In this unit test we have used a trick: we create a string ("JSON") representation of each object, using `JSON.stringify()`. Then we compare the resulting strings. For our purposes here this will work fine. However, it is a fragile way of comparing objects: if we change the order of the properties in one object (e.g. placing the `occupation` property before the `name` property in the `expected` object) the comparison will fail, although we should still consider the objects to match. In Week 3 we will be using the Jest test library that has more advanced "matchers" that work correctly even if the order of the properties is different.

```js
function test2() {
  console.log('Test 2: gender and salary should be filtered out');
  const expected = [
    {
      name: 'John',
      occupation: 'developer',
      email: 'john.doe@somewhere.net',
    },
    {
      name: 'Jane',
      occupation: 'manager',
      email: 'jane.eyre@somewhere.net',
    },
  ];
  const result = filterPrivateData(employeeRecords);
  console.assert(JSON.stringify(result) === JSON.stringify(expected));
}
```
