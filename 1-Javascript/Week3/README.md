# Homework Javascript Week 3

The homework for this week can be found in this folder.

## Handing in your homework

Push your code to your own github and TODO

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

   - It takes a single argument: `name`
   - Its function body includes a variable that holds an array, `compliments`, initialized with 10 strings. Each string should be a compliment, like `"great"`, `"awesome"` and so on.
   - It should randomly select a compliment from the array.
   - It should return the string **"You are _\<compliment>_, _\<name>_!"**, where _\<compliment>_ is a randomly selected compliment and _\<name>_ is the name that was passed as the function's argument.

2. Call the function three times, giving each function call the same argument: your name. Use `console.log` each time to display the return value of the `giveCompliment` function to the console.

### Exercise 2: Dog years

**File**: `ex2-dogYears.js`

You know how old your dog is in human years, but what about dog years? Let's calculate it!

1. Write a function named `calculateDogAge`.

   - It takes one argument: your (fictional) puppy's age (number).
   - Calculate your dog's age based on the conversion rate of `1 human year to 7 dog years`.
   - Return a string: **"Your doggie is _\<age>_ years old in dog years!"**

2. Use `console.log` to display the result of the function for three different ages.

### Exercise 3: Be your own fortune teller\*\*

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

2. Write a function named `addToShoppingCart`.

- It takes 1 argument: a grocery item (string)
- Add grocery item to `shoppingCart`. If the amount of items is more than 3 remove the first one in the array.
- Loops through the array in order to list out the items.
- Return a string: **"You bought _\<items-bought>_!"**.

3. Call the function 3 times, each time with a different string as the argument. Use `console.log` to display the results.
