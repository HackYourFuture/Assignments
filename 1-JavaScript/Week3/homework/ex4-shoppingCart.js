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

function addToShoppingCart(str) {
  shoppingCart.push(str);
  if (shoppingCart.length > 3) {
    shoppingCart.shift();
  }
  return `You bought ${shoppingCart.join(', ')}!`;
}
console.log(addToShoppingCart('chocolate')); // "You bought bananas, milk, chocolate!"
console.log(addToShoppingCart('waffles')); // "You bought milk, chocolate, waffles!"
console.log(addToShoppingCart('tea')); // "You bought chocolate, waffles, tea!"

// ! Do not change or remove any code below
module.exports = {
  shoppingCart,
  addToShoppingCart,
};
