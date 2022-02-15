"use strict";

const cartForParty = {
  // TODO complete this object
  water: "1.3",
  drink: "1.4",
  chips: "2.4",
  apple: "1.75",
  orange: "0.99",
};

function calculateTotalPrice(myObject) {
  let total = 0;
  for (let [key, obj] of Object.entries(myObject)) {
    total += parseFloat(`${obj}`);
  }
  return `Total: €${total}`;
}

// ! Test functions (plain vanilla JavaScript)
function test1() {
  console.log("\nTest 1: calculateTotalPrice should take one parameter");
  // TODO replace this comment with your code
  console.log(calculateTotalPrice(cartForParty));
}

function test2() {
  console.log("\nTest 2: return correct output when passed cartForParty");
  // TODO replace this comment with your code
  console.log(calculateTotalPrice(cartForParty));
}

function test() {
  test1();
  test2();
}

test();
