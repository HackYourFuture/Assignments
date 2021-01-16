"use strict";

const shoppingCart = ["bananas", "milk"];

function addToShoppingCart(/* parameters go here */) {
  // replace this comment with your code
}

addToShoppingCart("chocolate"); // Returns "You bought bananas, milk, chocolate!"
addToShoppingCart("waffles"); // Returns "You bought milk, chocolate, waffles!"
addToShoppingCart("tea"); // Returns "You bought chocolate, waffles, tea!"

// Do not change or remove any code below
module.exports = {
  shoppingCart,
  addToShoppingCart,
};
