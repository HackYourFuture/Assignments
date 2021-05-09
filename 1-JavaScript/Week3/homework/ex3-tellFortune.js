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


const numKids = [
  3 , 2 ,1 ,4 ,7
];

const partnerNames = [
  'Jack','Jim','Carl','Ian','Sam'
];

const locations = [
  'Holland','Spain','Italy','Egypt','Canada'
];

const jobTitles = [
  'programmer', 'teacher','doctor','barista','D.J'
];


function selectRandomly(aar) {
  const result = aar[Math.floor(Math.random() * aar.length)];
   return result;
   
 }



function tellFortune(num,str1,str2,str3) {
   
   return `You will be a ${selectRandomly(str3)} in ${selectRandomly(str2)}, married to ${selectRandomly(str1)} with ${selectRandomly(num)} kids.`
}


console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
console.log(tellFortune(numKids, partnerNames, locations, jobTitles));

// ! Do not change or remove the code below
module.exports = tellFortune;
