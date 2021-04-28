'use strict';
/*
Your mom bought you a basket of fruit, because you're doing so well in
HackYourFuture. How sweet of her!

However, she forgot that you are allergic to lemons! Let's quickly dispose of
them before you get an attack.

Complete the function called `sanitizeFruitBasket`:

- It should take two parameters: an array of strings representing a fruit basket 
  to be sanitized and a string indicating the name of the fruit to be taken out.
- Use the `filter` array method to take out the unwanted fruit.
- Return a new array that contains the fruits without any lemons.
*/
const fruitBasket = [
  'apple',
  'lemon',
  'grapefruit',
  'lemon',
  'banana',
  'watermelon',
  'lemon',
];

// ! Function under test
function sanitizeFruitBasket(/* TODO parameter(s) go here */) {
  // TODO complete this function
}

// Unit tests (using Jest)
describe('sanitizeFruitBasket', () => {
  test('should take two parameters', () => {
    // The `.length` property indicates the number of parameters expected by
    // the function.
    expect(sanitizeFruitBasket).toHaveLength(2);
  });

  test('should use `.filter()`', () => {
    // The `.toString()` method returns the function's source text as a string
    // value.
    const sourceText = sanitizeFruitBasket.toString();
    expect(sourceText).toEqual(expect.stringContaining('.filter('));
  });

  test('should not modify the original `fruitBasket` array', () => {
    // Save the original contents of the fruit basket
    const originalFruitBasketContents = [...fruitBasket];
    sanitizeFruitBasket(fruitBasket, 'lemon');
    // Check that the original contents of the fruit basket it still there
    expect(fruitBasket).toEqual(originalFruitBasketContents);
  });

  test('should return a new array that does not include the unwanted `lemon`', () => {
    const expected = ['apple', 'grapefruit', 'banana', 'watermelon'];
    const result = sanitizeFruitBasket(fruitBasket, 'lemon');
    expect(result).toEqual(expected);
  });
});
