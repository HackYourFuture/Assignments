"use strict";

const shoppingCart = ["bananas", "milk"];

// ! Function to be tested
function addToShoppingCart(grocery) {
  // TODO complete this function
  if (grocery === undefined) {
    return `You bought ${shoppingCart}!`;
  }
  if (shoppingCart.length >= 3) {
    shoppingCart.shift();
  }
  shoppingCart.push(grocery);
  const mySpring = shoppingCart.join(", ");
  return `You bought ${mySpring}!`;
}

// ! Test functions (plain vanilla JavaScript)
function test1() {
  console.log(
    "Test 1: addShoppingCart() called without an argument should leave the shopping cart unchanged"
  );
  const expected = "You bought bananas, milk!";
  const actual = addToShoppingCart();
  console.assert(actual === expected);
}

function test2() {
  console.log("Test 2: addShoppingCart() should take one parameter");
  const expected = 1;
  const actual = addToShoppingCart.length;
  console.assert(actual === expected);
}

function test3() {
  console.log("Test 3: `chocolate` should be added");
  const expected = "You bought bananas, milk, chocolate!";
  const actual = addToShoppingCart("chocolate");
  console.assert(actual === expected);
}

function test4() {
  console.log("Test 4: `waffles` should be added and `bananas` removed");
  const expected = "You bought milk, chocolate, waffles!";
  const actual = addToShoppingCart("waffles");
  console.assert(actual === expected);
}

function test5() {
  console.log("Test 5: `tea` should be added and `milk` removed");
  const expected = "You bought chocolate, waffles, tea!";
  const actual = addToShoppingCart("tea");
  console.assert(actual === expected);
}

function test() {
  test1();
  test2();
  test3();
  test4();
  test5();
}

test();
