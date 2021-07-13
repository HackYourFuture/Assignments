'use strict';
/*------------------------------------------------------------------------------
Why pay a fortune teller when you can just program your fortune yourself?

1. Create four arrays, `numKids`, `partnerNames`, `locations` and `jobTitles`. 
   Give each array five random values that have to do with the name of 
   the variable.

2. Complete the function `selectRandomly`. This function should take an array 
   as a parameter and return a randomly selected element as its return value.

3. Complete the function named `tellFortune` as follows:

   - It should take four arguments (in the order listed): 
     * number of children (`number`), 
     * partner's name (`string`), 
     * geographic location (`string`) and 
     * job title (`string`).
   - It should use the `selectRandomly` function to randomly select values from 
     the arrays.
   - It should return a string: "You will be a `jobTitle` in `location`, 
    married to `partnerName` with `numKids` kids."

4. Call the function three times, passing the arrays as arguments. Use `
   console.log` to display the results.

Note: The DRY is put into practice here: instead of repeating the code to 
randomly select array elements four times inside the `tellFortune` function 
body, this code is now written once only in a separated function.
-----------------------------------------------------------------------------*/

const numKids = [1, 3, 4, 2, 5];
// TODO add elements here

const partnerNames = ['Paula', 'Sara', 'Anna', 'Ola', 'Mona'];
// TODO add elements here

const locations = ['Amsterdam', 'Rotterdam', 'Utrecht', 'New york', 'rome'];
// TODO add elements here

const jobTitles = ['accountant', 'Doctor', 'Developer', 'Salesman', 'Manager'];
// TODO add elements here

// This function should take an array as its parameter and return
// a randomly selected element as its return value.

function selectRandomly(arr) {
  // TODO complete this function
  const randomSec = arr[Math.floor(Math.random() * arr.length)];
  return randomSec;
}

function tellFortune(arr1, arr2, arr3, arr4) {
  // TODO complete this function
  const numKid = selectRandomly(arr1);
  const partnerName = selectRandomly(arr2);
  const location = selectRandomly(arr3);
  const jobTitle = selectRandomly(arr4);
  return `you will be ${jobTitle} in ${location}, married to ${partnerName} with ${numKid} kids`;
}

console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
console.log(tellFortune(numKids, partnerNames, locations, jobTitles));

// ! Do not change or remove the code below
module.exports = tellFortune;
