'use strict';
/*------------------------------------------------------------------------------
Why pay a fortune teller when you can just program your fortune yourself?

1. Create four arrays, `numKids`, `partnerNames`, `locations` and `jobTitles`. 
   Give each array five random values that have to do with the name of 
   the variable.

2. Complete the function `selectRandomly`. This function should take an array 
   as a parameter and return a randomly selected element as its return value.

3. Complete the function named `tellFortune` as follows:

   - It should take four arguments: number of children (`number`), partner's 
     name (`string`), geographic location (`string`) and job title (`string`).
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
const numKids = ['erk', 'furkan', 'sayfu', 'lutun', 'Gul'];
const partnerNames = ['aa', 'fss', 'alif', 'gulya', 'roze'];
const locations = ['Urumqi', 'kashiger', 'Altay', 'Istanbul'];
const jobTitles = ['teacher', ' busisnesman', 'SDET', 'dev', 'TESTER'];

function selectRandomly(arr) {
  let r_value = arr[Math.floor(Math.random() * arr.length)];
  return r_value;
}

function tellFortune(arr1, arr2, arr3, arr4) {
  return `You will be a ${selectRandomly(arr1)} in ${selectRandomly(
    arr2
  )}, married to ${selectRandomly(arr3)} with ${selectRandomly(arr4)} kids.`;
}

console.log(tellFortune(jobTitles, locations, partnerNames, numKids));

// ! Do not change or remove the code below
module.exports = tellFortune;
