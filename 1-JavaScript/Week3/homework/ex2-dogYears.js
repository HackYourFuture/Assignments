function calculateDogAge(age) {
  return `Your doggie is ${age * 7} years old in dog years!`;
}

function main() {
  console.log(calculateDogAge(1)); // -> "Your doggie is 7 years old in dog years!"
  console.log(calculateDogAge(2)); // -> "Your doggie is 14 years old in dog years!"
  console.log(calculateDogAge(3)); // -> "Your doggie is 21 years old in dog years!"
}

if (process.env.NODE_ENV !== 'test') {
  main();
}
module.exports = calculateDogAge;
