'use strict';
/*------------------------------------------------------------------------------
Why pay a fortune teller when you can just program your fortune yourself?

1. Create four arrays, `numKids`, `partnerNames`, `locations` and `jobTitles`. 
   Give each array five random string values that have to do with the name of 
   the variable.

2. Complete the function `selectRandomly`. This function should take an array 
   as a parameter and return a randomly selected element as its return value.

3. Complete the function named `tellFortune` as follows:

   - It should take four arguments: number of children (`number`), partner's 
     name (`string`), geographic location (`string`) and job title (`string`).
   - It should use the `selectRandomly` function to randomly select values from 
     the arrays.
   - It should return a string: "You will be a `jobTitle` in `location`, 
    married to `partnerName` with `numKids`."

4. Call the function three times, passing the arrays as arguments. Use `
   console.log` to display the results.

Note: The DRY is put into practice here: instead of repeating the code to 
randomly select array elements four times inside the `tellFortune` function 
body, this code is now written once only in a separated function.
-----------------------------------------------------------------------------*/
const numKids = [15, 25, 35, 45, 55];

const partnerNames = [
  'Abdulkareem',
  'Adel',
  'autofix',
  'camelcase',
  'clonedeep',
];

const locations = ['Amsterdam', 'London', 'Paris', 'Groningen', 'Berlin'];

const jobTitles = [
  'Engineer',
  'Cook',
  'Salesperson',
  'Driver',
  'Data Scientist',
];

// This function should take an array as its parameter and return
// a randomly selected element as its return value.
function selectRandomly(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

function tellFortune(numKids, partnerNames, locations, jobTitles) {
  const numKid = selectRandomly(numKids);
  const partnerName = selectRandomly(partnerNames);
  const location = selectRandomly(locations);
  const jobTitle = selectRandomly(jobTitles);
  return `You will be a ${jobTitle} in ${location}, married to ${partnerName} with ${numKid} kids.`;
}

console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
console.log(tellFortune(numKids, partnerNames, locations, jobTitles));

// ! Do not change or remove the code below
module.exports = tellFortune;
