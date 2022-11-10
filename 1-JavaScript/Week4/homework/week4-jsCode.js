'use strict';

//########################################################################3
// ex1
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/1-JavaScript/Week4#exercise-1-the-odd-ones-out

The `doubleEvenNumbers` function returns only the even numbers in the array 
passed as the `numbers` parameter and doubles them.

Let's rewrite it (or _refactor_ it, as experienced developers would call it):

- Using the `map` and `filter` functions, rewrite the function body of
`doubleEvenNumbers`.
------------------------------------------------------------------------------*/
// ! Function to be tested
// function doubleEvenNumbers(numbers) {
//   // TODO rewrite the function body using `map` and `filter`.
//   const newNumbers = [];
//   for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] % 2 === 0) {
//       newNumbers.push(numbers[i] * 2);
//     }
//   }
//   return newNumbers;
// }
function doubleEvenNumbers(numbers){
    let newNumbers = numbers.filter(num => num % 2 == 0).map(num => num*2)
    return newNumbers
}
//########################################################################
//ex2
/*------------------------------------------------------------------------------
Full description atL https://github.com/HackYourFuture/Homework/tree/main/1-JavaScript/Week4#exercise-2-whats-your-monday-worth

- Complete the function names `computeEarnings`. It should take an array of
  tasks and an hourly rate as arguments and return a formatted Euro amount
  (e.g: `€11.34`) comprising the total earnings.
- Use the `map` array function to take out the duration time for each task.
- Multiply each duration by a hourly rate for billing and sum it all up.
- Make sure the program can be used on any array of objects that contain a
  `duration` property with a number value.
------------------------------------------------------------------------------*/
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

const hourlyRate = 25;

function computeEarnings(mondayTasks, hourlyRate) {
  let calc = 0;
  for(let i = 0; i < Object.keys(mondayTasks).length; i++){
      let amount = mondayTasks[i].duration/60 * hourlyRate;
      calc = calc + amount
  }
  return (`€${calc}`)
}
//########################################################################
//ex3
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/1-JavaScript/Week4#exercise-3-lemon-allergy

Your mom bought you a basket of fruit, because you're doing so well in
HackYourFuture. How sweet of her!

However, she forgot that you are allergic to lemons! Let's quickly dispose of
them before you get an attack.

Complete the function called `sanitizeFruitBasket`:

- It should take two parameters: an array of strings representing a fruit basket 
  to be sanitized and a string indicating the name of the fruit to be taken out.
- Use the `filter` array method to take out the unwanted fruit.
- Return a new array that contains the fruits without any lemons.
------------------------------------------------------------------------------*/
const fruitBasket = ['apple', 'lemon', 'grapefruit', 'lemon', 'banana', 'watermelon', 'lemon'];

const takeOut = 'lemon';
  
// ! Function under test
function sanitizeFruitBasket(fruitBasket, takeOut) {
  const originalFruitBasketContents = [...fruitBasket];
  let newBasket = originalFruitBasketContents.filter(fruit => fruit != takeOut)
  return newBasket
}
//########################################################################

module.exports = {doubleEvenNumbers, computeEarnings, sanitizeFruitBasket}