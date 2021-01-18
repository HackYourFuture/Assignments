/*------------------------------------------------------------------------------
The `doubleEvenNumbers` function returns only the even numbers in the array `
myNumbers` and doubles them. While this code works as advertised we would like 
to use a more _functional_ approach.

Let's rewrite it (or _refactor_ it, as professional developers would call it):

- Using the `map` and `filter` functions, rewrite the function body of 
`doubleEvenNumbers`.
------------------------------------------------------------------------------*/
function doubleEvenNumbers(numbers) {
  // TODO: rewrite the function body using `map` and `filter`.
  const newNumbers = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      newNumbers.push(numbers[i] * 2);
    }
  }
  return newNumbers;
}

const myNumbers = [1, 2, 3, 4];
console.log(doubleEvenNumbers(myNumbers)); // Logs "[4, 8]" to the console

// ! Do not change or remove the code below
module.exports = doubleEvenNumbers;
