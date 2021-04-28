/*------------------------------------------------------------------------------
The `doubleEvenNumbers` function returns only the even numbers in the array 
passed as the `numbers` parameter and doubles them.

Let's rewrite it (or _refactor_ it, as experienced developers would call it):

- Using the `map` and `filter` functions, rewrite the function body of
`doubleEvenNumbers`.
------------------------------------------------------------------------------*/
// ! Function to be tested
function doubleEvenNumbers(numbers) {
  // TODO rewrite the function body using `map` and `filter`.
  const newNumbers = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      newNumbers.push(numbers[i] * 2);
    }
  }
  return newNumbers;
}

// ! Test function (plain vanilla JavaScript)
function test() {
  // test input
  const input = [1, 2, 3, 4];
  // expected outcome
  const expected = [4, 8];

  // execute function under test
  const result = doubleEvenNumbers(input);

  // assert that `result` is an array
  console.assert(Array.isArray(result), 'result should be an array');

  // assert that the `result` array has the expected length
  console.assert(
    result.length === expected.length,
    'result and expected should have the same length'
  );

  // assert that the `result` array contains the expected elements
  for (let i = 0; i < result.length; i++) {
    console.assert(
      result[i] === expected[i],
      `element[${i}] should match: expected ${expected[i]}, received ${result[i]}`
    );
  }
}

// ! Execute test
test();
