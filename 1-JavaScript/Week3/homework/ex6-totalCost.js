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
  // TODO complete this object
};

function calculateTotalPrice(/* TODO parameter(s) go here */) {
  // TODO replace this comment with your code
}

function test1() {
  console.log('Test 1: cartForParty is an object with 5 numeric properties');
  // TODO replace this comment with your code
}

function test2() {
  console.log('\nTest 2: calculateTotalPrice should take one argument');
  // TODO replace this comment with your code
}

function test3() {
  console.log('\nTest 2: calculateTotalPrice should return correct output');
  // TODO replace this comment with your code
}

function test() {
  test1();
  test2();
  test3();
}

test();
