# Homework Javascript Week 3

The homework for this week can be found in the `homework` folder.

## Exercises

Starter code for all exercises is located in the `homework` folder. Modify the starter code so that the requirements of the exercise are met. At the bottom of each exercise file you will see a code snippet similar to:

```js
// Do not change or remove the code below
module.exports = giveCompliment;
```

Do not delete or modify that code. It is required for automatic of the exercise.

### Exercise 1: You are amazing!

**File**: `ex1-giveCompliment.js`

1. Write a function named `giveCompliment` with the following characteristics:

   - It takes a single argument: `name`.
   - Its function body includes a variable that holds an array, `compliments`, initialized with 10 strings. Each string should be a compliment, like `"great"`, `"awesome"` and so on.
   - It should randomly select a compliment from the array.
   - It should return the string _"You are `compliment`, `name`!"_, where `compliment` is a randomly selected compliment and `name` is the name that was passed as the function's argument.

2. Call the function three times, giving each function call the same argument: your name. Use `console.log` each time to display the return value of the `giveCompliment` function to the console.

### Exercise 2: Dog years

**File**: `ex2-dogYears.js`

You know how old your dog is in human years, but what about dog years? Let's calculate it!

1. Write a function named `calculateDogAge`.

   - It takes one argument: your (fictional) puppy's age (number).
   - Calculate your dog's age based on the conversion rate of `1 human year to 7 dog years`.
   - Return a string: **"Your doggie is _\<age>_ years old in dog years!"**

2. Use `console.log` to display the result of the function for three different ages.

### Exercise 3: Be your own fortune teller

**File**: `ex3-tellFortune.js`

Why pay a fortune teller when you can just program your fortune yourself?

1. Create four arrays, `numKids`, `partnerNames`, `locations` and `jobs`. Give each array five random string values that have to do with the name of the variable.

2. Write a function named `tellFortune` with the following characteristics:

   - It takes four arguments: number of children (number), partner's name (string), geographic location (string), job title (string).
   - It randomly select values from the arrays.
   - It returns a string: **"You will be a _\<job-title>_ in _\<location>, married to _\<partner-name>_ with _\<number-of-kids>\_ kids.**"

3. Call the function three times, passing the arrays as arguments. Use `console.log` to display the results.

### Exercise 4: Shopping at the supermarket

**File**: `ex4-shoppingCart.js`

Let's do some grocery shopping! We're going to get some things to cook dinner with. However, you like to spend money and always buy too many things. So when you have more than 3 items in your shopping cart the first item gets taken out.

1. Create an array called `shoppingCart` that holds the following strings: `"bananas"` and `"milk"`.

2. Write a function named `addToShoppingCart` with the following characteristics:

   - It takes one argument: a grocery item (string)
   - It adds the grocery item to `shoppingCart`. If the number of items is more than three remove the first one in the array.
   - Loops through the array in order to list out the items in the shopping cart.
   - Return a string: **"You bought _\<items-bought>_!"**.

3. Call the function three times, each time with a different string as the argument. Use `console.log` to display the results.

### Exercise 5: Total cost is ...

**File**: `ex5-totalCost.js`

You want to buy a couple of things from the supermarket to prepare for a party. After scanning all the items the cashier wants to give you the total price, but the machine is broken! Let's write her a `function` that does it for her instead!

1. Create an object named `cartForParty` with five properties. Each property should be a grocery item (like `beers` or `chips`) and hold a number value (like `1.75` or `0.99`).

2. Write a function called `calculateTotalPrice`.

   - It takes one argument: an object that contains properties that only contain number values.
   - Loop through the object and add all the number values together.
   - Return a string: **"Total: _€\<amount>_"**.

3. Call the function once, giving it the object `cartForParty` as an argument. Use `console.log` to display the result.

### Exercise 6: Credit Card Validator

**File**: `ex6-creditNumberValidator`

In this project you'll write a function called `validateCreditNumber` that validates whether or not a credit card number is valid.

Here are the criteria for a valid number:

- Input must be 16 characters.
- All characters must be numbers.
- At least two different numbers should be represented.
- The last number must be even.
- The sum of all the numbers must be greater than 16.

The following credit card numbers are valid:

```markdown
9999777788880000
6666666666661666
```

The following credit card numbers are invalid:

```markdown
a92332119c011112 (invalid characters)
4444444444444444 (only one type of number)
1111111111111110 (sum less than 16)
6666666666666661 (odd final number)
```

**Expected output:**

```js
// Returns "Invalid! The input a92332119c011112 should contain only numbers!""
console.log(validateCreditNumber("a92332119c011112"));

// Returns "Invalid! The input 4444444444444444 should contain at least 2 different types of numbers!""
console.log(validateCreditNumber("4444444444444444"));

// Returns "Success! The input 6666666666661666 is a valid credit card number!""
console.log(validateCreditNumber("6666666666661666"));
```
