/* -----------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/1-JavaScript/Week3#exercise-1-you-are-amazing

1. Complete the function named `giveCompliment`as follows:

   - It should take a single parameter: `name`.
   - Its function body should include a variable that holds an array,
     `compliments`, initialized with 10 strings. Each string should be a
     compliment, like `"great"`, `"awesome"` and so on.
   - It should randomly select a compliment from the array.
   - It should return the string "You are `compliment`, `name`!", where
     `compliment` is a randomly selected compliment and `name` is the name that
     was passed as an argument to the function.

2. Call the function three times, giving each function call the same argument:
   your name.
   Use `console.log` each time to display the return value of the
   `giveCompliment` function to the console.
-----------------------------------------------------------------------------*/
export function giveCompliment(name) {
  //Array of compliments names
  const compliments = [
    'amazing',
    'awesome',
    'brilliant',
    'clever',
    'wonderful',
    'excellent',
    'fantastic',
    'funny',
    'smart',
  ];
  // Randomly select a compliment
  const randomIndex = Math.floor(Math.random() * compliments.length);
  const compliment = compliments[randomIndex];

  // Return the compliment string
  return `You are ${compliment}, ${name}!`;
}

function main() {
  const myName = 'Hossein';

  // Call the function three times with myName
  console.log(giveCompliment(myName));
  console.log(giveCompliment(myName));
  console.log(giveCompliment(myName));

  // Another example with a different name
  const yourName = 'Kelisa';

  // Call the function three times with yourName
  console.log(giveCompliment(yourName));
  console.log(giveCompliment(yourName));
  console.log(giveCompliment(yourName));
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
