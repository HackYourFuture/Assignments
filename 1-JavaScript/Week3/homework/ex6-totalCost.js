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
// const cartForParty1 = {
//   // TODO complete this object
//   product1: {
//     name: 'beers',
//     value: 0.70
//   },
//   product2: {
//     name: 'chips',
//     value: 1.19
//   },
//   product3: {
//     name: 'chocolate',
//     value: 1.75
//   },
//   product4: {
//     name: 'Waffle',
//     value: 2.50
//   },
//   product5: {
//     name: 'wine',
//     value: 5
//   }
// };

const cartForParty = {
  beer : 0.70,
  chips : 1.19,
  chocolate : 1.75,
  waffle : 2.50,
  wine : 5
}

function calculateTotalPrice(cartForParty) {
  // TODO replace this comment with your code
  let totalAmount = 0;
  for (const x in cartForParty) {
    totalAmount += cartForParty[x];
  }
  return totalAmount;
}

function test1() {
  console.log('\nTest 1: calculateTotalPrice should take one parameter');
  console.assert(calculateTotalPrice.length === 1);
}

function test2() {
  console.log('\nTest 2: return correct output when passed cartForParty');
  const expected = 11.14;
  const actual = calculateTotalPrice(cartForParty);
  console.assert(actual === expected);
}

function test() {
  test1();
  test2();
}

test();


// console.log(calculateTotalPrice(cartForParty));