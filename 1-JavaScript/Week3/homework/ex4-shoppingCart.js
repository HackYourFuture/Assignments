'use strict';
/*------------------------------------------------------------------------------
Let's do some grocery shopping! We're going to get some things to cook dinner
with. However, you like to spend money and always buy too many things. So when 
you have more than 3 items in your shopping cart the first item gets taken out.

1. Create an array called `shoppingCart` that holds the following strings: 
   "bananas" and "milk".

2. Complete the function named `addToShoppingCart` as follows:

   - It should take one argument: a grocery item (string)
   - It should add the grocery item to `shoppingCart`. If the number of items is
     more than three remove the first one in the array.
   - It should iterate through the array in order to list out the items in the 
     shopping cart.
   - It should return a string: "You bought `shoppingCart`!".

3. Call the function three times, each time with a different string as the 
   argument. Use `console.log` to display the results.
-----------------------------------------------------------------------------*/
const shoppingCart = ['bananas', 'milk'];

// ! Function to be tested
function addToShoppingCart(/* parameters go here */) {
  // TODO complete this function
}

// ! Test functions (plain vanilla JavaScript)
function test1() {
  console.log('Test 1: addShoppingCart() should take one parameter');
  // Note: the `.length` property of a function indicates the number of
  // parameters it expects.
  console.assert(addToShoppingCart.length === 1);
}

function test2() {
  console.log('Test 2: `chocolate` should be added');
  const result = addToShoppingCart('chocolate');
  console.log(result);
  const expected = 'You bought bananas, milk, chocolate!';
  console.assert(result === expected);
}

function test3() {
  console.log('Test 3: `waffles` should be added and `bananas` removed');
  const result = addToShoppingCart('waffles');
  console.log(result);
  const expected = 'You bought milk, chocolate, waffles!';
  console.assert(result === expected);
}

function test4() {
  console.log('Test 4: `tea` should be added and `milk` removed');
  const result = addToShoppingCart('tea');
  console.log(result);
  const expected = 'You bought chocolate, waffles, tea!';
  console.assert(result === expected);
}

function test() {
  test1();
  test2();
  test3();
  test4();
}

test();
