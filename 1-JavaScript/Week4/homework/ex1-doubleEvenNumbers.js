/*------------------------------------------------------------------------------
The `doubleEvenNumbers` function returns only the even numbers in the array `
myNumbers` and doubles them. While this code works as advertised we would like
to use a more _functional_ approach.

Let's rewrite it (or _refactor_ it, as professional developers would call it):

- Using the `map` and `filter` functions, rewrite the function body of
`doubleEvenNumbers`.
------------------------------------------------------------------------------*/
function doubleEvenNumbers(numbers) {
  const doubleNum = numbers
    .filter((number) => number % 2 === 0)
    .map((num) => num * 2);
  return doubleNum;
}

const myNumbers = [1, 2, 3, 4];
console.log(doubleEvenNumbers(myNumbers)); // Logs "[4, 8]" to the console

const yourNumbers = [1, 3, 6, 10, 13, 4];
console.log(doubleEvenNumbers(yourNumbers)); // Logs "[12, 20, 8]" to the console

// ! Do not change or remove the code below
module.exports = doubleEvenNumbers;
