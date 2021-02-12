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
   - It should loop through the array in order to list out the items in the 
     shopping cart.
   - It should return a string: "You bought `shoppingCart`!".

3. Call the function three times, each time with a different string as the 
   argument. Use `console.log` to display the results.
-----------------------------------------------------------------------------*/
const shoppingCart = ['bananas', 'milk'];

function addToShoppingCart(grocery) {
  if (shoppingCart.length > 2) {
    shoppingCart.shift();
    shoppingCart.push(grocery);
  } else {
    shoppingCart.push(grocery);
  }
  let i = 0;
  for (i = 0; i < shoppingCart.length; i++) {
    return `You bought ${shoppingCart[i]}, ${shoppingCart[i + 1]}, ${
      shoppingCart[i + 2]
    }!`;
  }
}

addToShoppingCart('chocolate'); // Returns "You bought bananas, milk, chocolate!"
addToShoppingCart('waffles'); // Returns "You bought milk, chocolate, waffles!"
addToShoppingCart('tea'); // Returns "You bought chocolate, waffles, tea!"

// ! Do not change or remove any code below
module.exports = {
  shoppingCart,
  addToShoppingCart,
};
