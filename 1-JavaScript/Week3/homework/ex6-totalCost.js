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

   - It takes one parameter: an object that contains properties that only contain
     number values.
   - Loop through the object and add all the number values together.
   - Return a string: "Total: €`amount`".

3. Complete the unit test functions and verify that all is working as expected.
-----------------------------------------------------------------------------*/

const cartForParty = {
  beer: 5,
  chips: 2.5,
  cola: 1.2,
  juice: 3,
  water: 1.7,
};

function calculateTotalPrice(total) {
  let totalValue = 0;
  for (const item of Object.values(total)) {
    totalValue += item;
  }
  return `total:$ ${totalValue}`;
}
calculateTotalPrice(cartForParty);
function test1() {
  console.log('\nTest 1: calculateTotalPrice should take one parameter');
  // TODO replace this comment with your code
}

function test2() {
  console.log('\nTest 2: return correct output when passed cartForParty');
  // TODO replace this comment with your code
}

function test() {
  test1();
  test2();
}

test();
