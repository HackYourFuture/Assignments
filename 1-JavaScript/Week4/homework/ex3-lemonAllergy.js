"use strict";
/*
Your mom bought you a basket of fruit, because you're doing so well in
HackYourFuture. How sweet of her!

However, she forgot that you are allergic to lemons! Let's quickly dispose of
them before you get an attack.

- Complete the function called `sanitizeFruitBasket`. It should take two
   parameters: an array of strings representing a fruit basket to be sanitized
   and a string indicating the name of the fruit to be taken out.
- Use the `filter` array method to take out the unwanted fruit.
- Return a string that says: "My mom bought me a fruit basket, containing
  `list`!", where `list` is a comma-separated list of fruits.
*/
const fruitBasket = [
  "apple",
  "lemon",
  "grapefruit",
  "lemon",
  "banana",
  "watermelon",
  "lemon",
];

function sanitizeFruitBasket(/* TODO: parameter(s) go here */) {
  // TODO: complete this function
}

console.log(sanitizeFruitBasket(fruitBasket, "lemon"));
//    -> "My mom bought me a fruit basket containing apple, grapefruit, banana, watermelon!"

console.log(sanitizeFruitBasket(fruitBasket, "grapefruit"));
//    -> "My mom bought me a fruit basket containing apple, lemon, lemon, banana, watermelon, lemon!"

// ! Do not change or remove the code below
module.exports = {
  sanitizeFruitBasket,
  fruitBasket,
};
