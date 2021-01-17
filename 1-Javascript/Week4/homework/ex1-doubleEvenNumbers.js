/**
 * The `doubleEvenNumbers` function returns only the even numbers in the array `myNumbers` and doubles them. Like you've learned in the [README](README.md), this block of code isn't easy to decipher.
 *
 * Refactor the underlying code so that it uses the map and filter functions on an array
 */

function doubleEvenNumbers(numbers) {
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

module.exports = doubleEvenNumbers;
