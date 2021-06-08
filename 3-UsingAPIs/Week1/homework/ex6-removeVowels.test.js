// Function to be tested
function removeVowels(text) {
  // TODO complete the function body to pass the unit test
}

// Unit Tests
describe('removeVowels', () => {
  test('should remove all vowels from a string of text', () => {
    const result = removeVowels('Hello world!');
    /* cspell: disable-next-line */
    expect(result).toBe('Hll wrld!');
  });
});
