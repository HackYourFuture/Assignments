'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/1-JavaScript/Week3#exercise-3-be-your-own-fortune-teller

Why pay a fortune teller when you can just program your fortune yourself?

1. Create four arrays, `numKids`, `partnerNames`, `locations` and `jobTitles`. 
   Give each array five random values that have to do with the name of 
   the variable.

2. Complete the function `selectRandomly`. This function should take an array 
   as a parameter and return a randomly selected element as its return value.

3. Complete the function named `tellFortune` as follows:

   - It should take four arguments (in the order listed): 
     * the array with the options for the number of children, 
     * the array with the options for the partner's name, 
     * the array with the options for the geographic location and 
     * the array with the options for the job title.
   - It should use the `selectRandomly` function to randomly select values from 
     the arrays.
   - It should return a string: "You will be a `jobTitle` in `location`, 
    married to `partnerName` with `numKids` kids."

4. Call the function three times, passing the arrays as arguments. Use `
   console.log` to display the results.

Note: The DRY principle is put into practice here: instead of repeating the code to 
randomly select array elements four times inside the `tellFortune` function 
body, this code is now written once only in a separated function.
-----------------------------------------------------------------------------*/
const numKids = [2, 3, 4, 5, 6
  // TODO add elements here
];

const partnerNames = ['Lorene', 'Maria', 'Ojen', 'Sally', 'Jacky'
  // TODO add elements here
];

const locations = ['Amsterdam', 'Berlin', 'Rotterdam', 'Utrecht', 'Eindhoven'
  // TODO add elements here
];

const jobTitles = ['Frontend developer', 'Backend developer', 'Fullstack developer', 'Android developer', 'Software engineer'
  // TODO add elements here
];

// This function should take an array as its parameter and return
// a randomly selected element as its return value.
function selectRandomly(arr) {
  // TODO complete this function
  return arr[Math.floor(Math.random() * arr.length)];
}

function tellFortune(kids, wife, location, job) {
  // TODO complete this function
  return `You will be a ${selectRandomly(job)} in ${selectRandomly(location)} married to ${selectRandomly(wife)} with ${selectRandomly(kids)} kids`
}

console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
console.log(tellFortune(numKids, partnerNames, locations, jobTitles));

// ! Do not change or remove the code below
module.exports = tellFortune;
