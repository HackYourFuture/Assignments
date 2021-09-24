'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/1-JavaScript/Week3#exercise-6-total-cost-is

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
  // TODO complete this object
  beers: 1.75,
  chips: 0.99,
  olives: 2.55,
  vermouth: 6.40,
  ice: 1.50
};

function calculateTotalPrice(cart) {
  // TODO replace this comment with your code
  let amount = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const i in cart) {
    amount += cart[i];
  }
  return `Total: €${amount}`;
}

function test1() {
  console.log('\nTest 1: calculateTotalPrice should take one parameter');
  // TODO replace this comment with your code
  console.assert(calculateTotalPrice.length === 1);
}

function test2() {
  console.log('\nTest 2: return correct output when passed cartForParty');
  // TODO replace this comment with your code
  const amountExpected = cartForParty.beers + cartForParty.chips + cartForParty.olives + cartForParty.vermouth + cartForParty.ice;
  const expectedResult = `Total: €${amountExpected}`;
  const actualResult = calculateTotalPrice(cartForParty);
  console.assert(expectedResult === actualResult);
}

function test() {
  test1();
  test2();
}

test();
