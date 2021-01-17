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

The `doubleEvenNumbers` function returns only the even numbers in the array `myNumbers` and doubles them. Like you've learned in the [README](README.md), this block of code isn't easy to decipher.

Let's rewrite it:

- Using the `map` and `filter` functions, rewrite the function body of `doubleEvenNumbers`. Do not change any other code.

### Exercise 2: Be your own DRY fortune teller

**File:** `ex2-tellFortuneDRY.js`

Remember the fortune-teller exercise from last week? You were required to randomly select an element from each of the four arrays involved. If you have not done so already last week, we would like you to make your code DRY\* this week, by introducing a function called `selectRandomly` that takes an array as its argument and returns a randomly selected element from that array as its return value. Use this function within the `tellFortune` function to construct the complimentary message.

\*Don't Repeat Yourself

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

- Write a function that takes an array of tasks and an hourly rate as arguments and return a formatted Euro amount (e.g: `€11.34`) comprising the total earnings.
- Use the `map` array function to take out the duration time for each task.
- Multiply each duration by a hourly rate for billing and sum it all up.
- Make sure the program can be used on any array of objects that contain a `duration` property with a number value.

### Exercise 4: Lemon allergy

**File:** `ex4-lemonAllergy.js`

Your mom bought you a basket of fruit, because you're doing so well in HackYourFuture. How sweet of her!

```js
const fruitBasket = [
  "apple",
  "lemon",
  "grapefruit",
  "lemon",
  "banana",
  "watermelon",
  "lemon",
];
```

However, she forgot that you are allergic to lemons! Let's quickly dispose of them before you get an attack.

- Write a function called `sanitizeFruitBasket`. It should take two parameters: an array of strings representing a fruit basket to be sanitized and a string indicating the name of the fruit to be taken out.
- Use the `filter` array function to take out the unwanted fruit.
- Return a string that says: **"My mom bought me a fruit basket, containing _\<fruit-list>_!"**, where _\<fruit-list>_ is a comma-separated list of fruits.

### Exercise 5: Collective age

Have you ever wondered how old the HackYourFuture team members are? Or better still, what the collective age is? Let's find out!

```js
const hackYourFutureMembers = [
  { name: "Wouter", age: 33 },
  { name: "Federico", age: 32 },
  { name: "Noer", age: 27 },
  { name: "Tjebbe", age: 22 },
];
```

- Write a function called `computeCollectiveAge` that calculates the combined age of every member.
- Make use of the `map` function to get the ages.
- It should contain a function that takes a callback.
- The callback adds all the ages together and returns the number.
- The main function should write **"The collective age of the HYF team is: _\<number>_"** to the console and afterwards return the number.
