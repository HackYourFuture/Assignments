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
  whisky: 19.99,
  charcoal: 3.99,
  steaks: 30.90,
  chips: 5.75,
  cake: 8.99
};

function calculateTotalPrice(myObject) {
const amount = Object.values(myObject).reduce((a,b) => a + b);
return `"Total: €${amount}".`
} 

function test1() {
  console.log('\nTest 1: calculateTotalPrice should take one parameter');
  console.assert(calculateTotalPrice.length === 1);
}

function test2() {
  console.log('\nTest 2: return correct output when passed cartForParty');
  const actual = calculateTotalPrice(cartForParty);
  const expected = `"Total: €69.61999999999999".`;
  console.assert(actual === expected);
}

function test() {
  test1();
  test2();
}

test();
