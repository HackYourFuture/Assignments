# Homework Javascript Week 3

The homework for this week can be found in the `homework` folder.

## Exercises

Starter code for all exercises is located in the `homework` folder. Modify the starter code so that the requirements of the exercise are met. At the bottom of each exercise file you will see a code snippet similar to:

```js
// Do not change or remove the code below
module.exports = giveCompliment;
```

Do not delete or modify that code. It is required for automatic testing of the exercise.

### Exercise 1: You are amazing

**File**: `ex1-giveCompliment.js`

1. Complete the function named `giveCompliment`as follows:

   - It should take a single argument: `name`.
   - Its function body should include a variable that holds an array, `compliments`, initialized with 10 strings. Each string should be a compliment, like `"great"`, `"awesome"` and so on.
   - It should randomly select a compliment from the array.
   - It should return the string _"You are `compliment`, `name`!"_, where `compliment` is a randomly selected compliment and `name` is the name that was passed as the function's argument.

2. Call the function three times, giving each function call the same argument: your name. Use `console.log` each time to display the return value of the `giveCompliment` function to the console.

### Exercise 2: Dog years

**File**: `ex2-dogYears.js`

You know how old your dog is in human years, but what about dog years? Let's calculate it!

1. Complete the function named `calculateDogAge`.

   - It takes one argument: your (fictional) puppy's age (number).
   - Calculate your dog's age based on the conversion rate of 1 human year to 7 dog years.
   - Return a string: _"Your doggie is `age` years old in dog years!"_

2. Use `console.log` to display the result of the function for three different ages.

### Exercise 3: Be your own fortune teller

**File**: `ex3-tellFortune.js`

Why pay a fortune teller when you can just program your fortune yourself?

1. Create four arrays, `numKids`, `partnerNames`, `locations` and `jobTitles`. Give each array five random values that have to do with the name of the variable.

2. Complete the function `selectRandomly`. This function should take an array as a parameter and return a randomly selected element as its return value.

3. Complete the function named `tellFortune` as follows:

   - It should take four arguments: number of children (`number`), partner's name (`string`), geographic location (`string`) and job title (`string`).
   - It should use the `selectRandomly` function to randomly select values from the arrays.
   - It should return a string: _"You will be a `jobTitle` in `location`, married to `partnerName` with `numKids` kids."_

4. Call the function three times, passing the arrays as arguments. Use `console.log` to display the results.

Note: The DRY principle is put into practice here: instead of repeating the code to randomly select array elements four times inside the `tellFortune` function body, this code is now written once only in a separated function.

### Exercise 4: Shopping at the supermarket

#### File: `ex4-shoppingCart.js`

Let's do some grocery shopping! We're going to get some things to cook dinner with. However, you like to spend money and always buy too many things. So when you have more than 3 items in your shopping cart the first item gets taken out.

1. Create an array called `shoppingCart` that holds the following strings: `"bananas"` and `"milk"`.

2. Complete the function named `addToShoppingCart` as follows:

   - It should take one argument: a grocery item (string)
   - It should add the grocery item to `shoppingCart`. If the number of items is more than three remove the first one in the array.
   - It should loop through the array in order to list out the items in the shopping cart.
   - It should return a string: "You bought `shoppingCart`!".

3. Call the function three times, each time with a different string as the argument. Use `console.log` to display the results.

### Exercise 5: Improved shopping at the supermarket

#### File: `ex5-shoppingCartRedux.js`

From a _best practice_ point of view, there is a big problem with the code of the previous exercise (4): it modifies ("_mutates_") a global variable. In larger code bases this can become problematic, as it will be difficult to track down places in the code that might also (unexpectedly) mutate the global variable and, by doing so, cause bugs.

A function that mutates a global variable or in some other way interacts with the "_outside world_" (e.g. accessing a database, making a network request, or even logging something to the console) is said to cause "_side effects_. Sometimes this is necessary. A program that does not in some way interact with the outside world cannot possibly do something useful. However, in all other cases side-effects must be avoided.

Experienced developers prefer to work with _pure functions_. These functions do not access (let alone, _mutate_) any data that exists outside of their own scope and return results solely through the function's return value. All required data should be passed through the argument list.

A key characteristic of a pure function is that if it is repeatedly called with the same argument it always produces the same result. This is clearly not the case with the `addToShoppingCart()` function of the previous exercise.

In the current exercise we will rewrite the `addToShoppingCart` function to make it _pure_. Do the following:

1. Complete the parameter list of `addToShopping()`. As a first parameter it should accept a shopping cart array and as a second parameter it should accept a grocery item to be added.
2. The function should return a _new_ shopping cart array, following the same rule as in the previous exercise: it should contain a maximum of three items.
3. The shopping cart passed as an argument should not be modified.
4. When constructing the new shopping cart array you should make use of the ES5 _spread_ syntax.<br>See also [Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) on MDN Web Docs.

### Exercise 6: Total cost is

#### File: `ex6-totalCost.js`

You want to buy a couple of things from the supermarket to prepare for a party. After scanning all the items the cashier wants to give you the total price, but the machine is broken! Let's write her a _function_ that does it for her instead!

1. Create an object named `cartForParty` with five properties. Each property should be a grocery item (like `beers` or `chips`) and hold a number value (like `1.75` or `0.99`).

2. Write a function called `calculateTotalPrice`.

   - It takes one argument: an object that contains properties that only contain number values.
   - Loop through the object and add all the number values together.
   - Return a string: _"Total: €`amount`"_.

3. Call the function once, giving it the object `cartForParty` as an argument. Use `console.log` to display the result.

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

1. Complete the `filterPrivateData()` function. It should take a single argument: the array of employee records.
2. It should create a _new_ array, containing employee data without the private data.
3. Use [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring) to extract the non-private properties from an employee record (an `object`) and [object literal shorthand](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#property_definitions) to create a new employee record with just the non-private parts (`name`, `occupation` and `email`).
4. Return the new array as the return value of the function.
