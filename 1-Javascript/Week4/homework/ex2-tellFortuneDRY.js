"use strict";
const numChildren = [
  /* ... */
];
const partnerNames = [
  /* ... */
];
const locations = [
  /* ... */
];
const jobs = [
  /* ... */
];

// This function should take an array as its parameter and return
// a randomly selected element as its return value.
function selectRandomly(/* parameter(s) go here */) {
  // replace this comment with your code
}

function tellFortune(/* add parameter(s) here */) {
  // Replace these comment with your code.
  // Make use or the `selectRandomly` function above
  // to make your code DRY
}

console.log(tellFortune(numChildren, partnerNames, locations, jobs));
console.log(tellFortune(numChildren, partnerNames, locations, jobs));
console.log(tellFortune(numChildren, partnerNames, locations, jobs));

module.exports = {
  tellFortune,
};
