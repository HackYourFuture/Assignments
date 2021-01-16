# Homework Javascript Week 3

The homework for this week can be found in this folder.

## Handing in your homework

Push your code to your own github and TODO

## Exercises

Starter code for all exercises is located in the `homework` folder. Modify the starter code so that the requirements of the exercise are met. At the bottom of each exercise file you will see a code snippet similar to:

```js
// Do not change or remove the code below
module.exports = {
  giveCompliment,
};
```

Do not delete or modify that code. It is required for automatic of the exercise.

### Exercise: `ex1-giveCompliment.js`

1. Write a function named `giveCompliment` with the following characteristics:

   - It takes a single argument: `name`
   - Its function body includes a variable that holds an array, `compliments`, with 10 strings. Each string should be a compliment, like `"great"`, `"awesome"` and so on.
   - It should randomly select a compliment from the array.
   - It should return the string **"You are _\<compliment>_, _\<name>_!"**, where _\<compliment>_ is a randomly selected compliment and _\<name>_ is the name that was passed as an argument.

2. Call the function three times, giving each function call the same argument: your name. Use `console.log` each time to display the return value of `giveCompliment` to the console.
