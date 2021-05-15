'use strict';
/*------------------------------------------------------------------------------
In the current exercise we will rewrite the `addToShoppingCart` function to make 
it pure. Do the following:

1. Complete the parameter list of `addToShopping()`. As a first parameter it 
   should accept a shopping cart array and as a second parameter it should 
   accept a grocery item to be added.
2. The function should return a new shopping cart array, following the same rule 
   as in the previous exercise: it should contain a maximum of three items.
3. The shopping cart passed as an argument should not be modified.
4. When constructing the new shopping cart array you should make use of the ES5 
   spread syntax.
------------------------------------------------------------------------------*/
function addToShoppingCart(shoppingCart, item) {
  // TODO complete this function
  let newShoppingCart = [...shoppingCart];
  newShoppingCart.push(item);
  if (newShoppingCart.length > 3) {
    newShoppingCart.shift();
  }
  return newShoppingCart;
}

const shoppingCart = ['bananas', 'milk'];

const cartAfterFirst = addToShoppingCart(shoppingCart, 'chocolate');
const cartAfterSecond = addToShoppingCart(cartAfterFirst, 'waffles');
const cartAfterThird = addToShoppingCart(cartAfterSecond, 'tea');

console.log('Original shopping cart', shoppingCart);
console.log('After adding three items', cartAfterThird);

// ! Do not change or remove any code below
module.exports = addToShoppingCart;
