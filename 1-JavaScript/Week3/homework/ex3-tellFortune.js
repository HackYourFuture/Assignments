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

// This function should take an array as its parameter and return
// a randomly selected element as its return value.


function selectRandomly(myArr) {
  // TODO complete this function
  return myArr[Math.floor(Math.random() * myArr.length)];
  
}



function tellFortune(numKids, partnerNames, locations, jobTitles) {
  // TODO complete this function 
  // const arr = [Math.floor(Math.random()*partnerNames.length)];

  return  `You will be a ${selectRandomly(...[jobTitles])}  in ${selectRandomly(...[locations]) }
  married to ${selectRandomly(...[partnerNames])} with ${selectRandomly(...[numKids])} kids.`;
}



function main() {
  const numKids = [
    // TODO add elements here
    2,1,4,6,3
  ];

  const partnerNames = [
    // TODO add elements here
    "sophie" , "Mari" , "Tea" , "Kate", "Dory"
  ];

  const locations = [
    // TODO add elements here
    "winterswijk" , "almera" ,"deventer","amsterdam","Rotterdam"
  ];

  const jobTitles = [
    // TODO add elements here
    "full stack developer" , "designer" , "sales man" , "accounter" , "tester"
  ];

  

  console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
  console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
  console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
}

main();

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
module.exports = tellFortune;
