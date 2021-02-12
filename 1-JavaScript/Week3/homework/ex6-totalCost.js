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
  beers: 15.75,
  chips: 40.54,
  rice: 50.32,
  water: 30.76,
  bread: 40.98,
};

function calculateTotalPrice(myObject) {
  let sum = 0;

  for (const el in myObject) {
    if (Object.prototype.hasOwnProperty.call(myObject, el)) {
      sum += parseFloat(myObject[el]);
    }
  }

  return `Total: €${sum}`;
}

// this is one example, you will need to write a different object
calculateTotalPrice({
  apples: 12,
  bananas: 0.12,
  cranberries: 7.3,
  durian: 73,
  elderberry: 10,
}); // -> "Total: €102.42"

console.log(calculateTotalPrice(cartForParty));

// ! Do not change or remove the code below
module.exports = {
  cartForParty,
  calculateTotalPrice,
};
