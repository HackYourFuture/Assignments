'use strict';
/*------------------------------------------------------------------------------
You want to buy a couple of things from the supermarket to prepare for a party.
After scanning all the items the cashier wants to give you the total price, but
the machine is broken! Let's write her a function that does it for her
instead!

1. Create an object named `cartForParty` with five properties. Each property
   should be a grocery item (like `beers` or `chips`) and hold a number value
   (like `1.75` or `0.99`).

2. Complete the function called `calculateTotalPrice`.

   - It takes one argument: an object that contains properties that only contain
     number values.
   - Loop through the object and add all the number values together.
   - Return a string: "Total: €`amount`".

3. Call the function once, giving it the object `cartForParty` as an argument.
   Use `console.log` to display the result.
-----------------------------------------------------------------------------*/
const cartForParty = {
  // TODO complete this function
  beers: 1.75,
  chips: 0.99,
  chocolate: 1.25,
  waffles: 2.15,
  tea: 1.5,
};

function calculateTotalPrice(cartForParty) {
  // TODO replace this comment with your code
  let amount = 0;
  let x;
  for (x in cartForParty) {
    amount += cartForParty[x];
  }
  return console.log('"Total: €' + amount.toFixed(2) + '"');
}

calculateTotalPrice({
  beers: 1.75,
  chips: 0.99,
  chocolate: 1.25,
  waffles: 2.15,
  tea: 1.5,
});

// this is one example, you will need to write a different object
calculateTotalPrice({
  apples: 12,
  bananas: 0.12,
  cranberries: 7.3,
  durian: 73,
  elderberry: 10,
});
// -> "Total: €102.42"

// ! Do not change or remove the code below
module.exports = {
  cartForParty,
  calculateTotalPrice,
};
