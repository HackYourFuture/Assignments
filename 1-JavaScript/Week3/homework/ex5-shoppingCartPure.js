'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/1-JavaScript/Week3#exercise-5-improved-shopping-at-the-supermarket

In the current exercise we will rewrite the `addToShoppingCart` function to make 
it pure. Do the following:

1. Complete the parameter list of `addToShopping()`. As a first parameter it 
   should accept a shopping cart array and as a second parameter it should 
   accept a grocery item to be added.
2. The function should return a new shopping cart array, following the same rule 
   as in the previous exercise: it should contain a maximum of three items.
3. The shopping cart passed as an argument should not be mutated.
4. When constructing the new shopping cart array you should make use of the ES6 
   spread syntax.
5. Confirm that you function passes the provided unit tests.
------------------------------------------------------------------------------*/
function addToShoppingCart(item, ...shoppingCart) {
  if (item === undefined) {
    shoppingCart;
  } else if (shoppingCart.length > 2) {
    shoppingCart.push(item);
    shoppingCart.shift();
  } else {
    shoppingCart.push(item);
  }
  return shoppingCart;
}

// ! Test functions (plain vanilla JavaScript)
function test1() {
  console.log('Test 1: addToShoppingCart should take two parameters');
  console.assert(addToShoppingCart.length === 2);
}

function test2() {
  console.log('Test 2: addToShoppingCart should be a pure function');
  // A pure function should return the same result when called with
  // identical arguments. It should also no side effects (not tested here).
  const initialCart = ['bananas', 'milk'];
  const result1 = addToShoppingCart(initialCart, 'chocolate');
  const result2 = addToShoppingCart(initialCart, 'chocolate');
  console.assert(JSON.stringify(result1) === JSON.stringify(result2));
}

function test3() {
  console.log('Test 3: `chocolate` should be added');
  const initialCart = ['bananas', 'milk'];
  const result = addToShoppingCart(initialCart, 'chocolate');
  console.assert(result.length === 3);
  console.assert(result.includes('chocolate'));
}

function test4() {
  console.log('Test 4: `waffles` should be added');
  const initialCart = ['bananas', 'milk', 'chocolate'];
  const result = addToShoppingCart(initialCart, 'waffles');
  console.assert(result.length === 3);
  console.assert(result.includes('waffles'));
}

function test() {
  test1();
  test2();
  test3();
  test4();
}

test();
