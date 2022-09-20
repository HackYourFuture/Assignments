'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/1-JavaScript/Week3#exercise-4-shopping-at-the-supermarket

Let's do some grocery shopping! We're going to get some things to cook dinner
with. However, you like to spend money and always buy too many things. So when 
you have more than 3 items in your shopping cart the first item gets taken out.

1. Create an array called `shoppingCart` that holds the following strings: 
   "bananas" and "milk".

2. Complete the function named `addToShoppingCart` as follows:

   - It should take one argument: a grocery item (string)
   - It should add the grocery item to `shoppingCart`. If the number of items is
     more than three remove the first one in the array.
   - It should return a string "You bought <list-of-items>!", where 
     <list-of-items>is a comma-separated list of items from the shopping cart 
     array.

3. Confirm that your code passes the unit tests.
-----------------------------------------------------------------------------*/
const shoppingCart = ['bananas', 'milk'];

// ! Function to be tested
function addToShoppingCart(groceryItem) {
  // TODO complete this function

  if (groceryItem !== undefined) {
   shoppingCart.push(groceryItem);
  }
  if (shoppingCart.length > 3) {
    shoppingCart.shift();
  }  
    return `You bought ${shoppingCart.join(', ')}`;    
}

// ! Test functions (plain vanilla JavaScript)
function test1() {
  console.log(addToShoppingCart());

  const expected = 'You bought bananas, milk!';
  const actual = addToShoppingCart();
  console.assert(actual === expected);
}

function test2() {
  console.log(shoppingCart.indexOf("milk"));
  const expected = 1;
  const actual = addToShoppingCart.length;
  console.assert(actual === expected);
}

function test3() {
  console.log(addToShoppingCart('chocolate'));
  const expected = 'You bought bananas, milk, chocolate!';
  const actual = addToShoppingCart('chocolate');
  console.assert(actual === expected);
}

function test4() {
  console.log(addToShoppingCart('waffles'));
  const expected = 'You bought milk, chocolate, waffles!';
  const actual = addToShoppingCart('waffles');
  console.assert(actual === expected);
}

function test5() {
  console.log(addToShoppingCart('tea'));
  const expected = 'You bought chocolate, waffles, tea!';
  const actual = addToShoppingCart('tea');
  console.assert(actual === expected);
}

function test() {
  test1();
  test2();
  test3();
  test4();
  test5();
}

test();
