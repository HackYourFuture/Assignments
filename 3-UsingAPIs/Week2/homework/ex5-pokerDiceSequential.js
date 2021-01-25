const { rollDice } = require("./pokerDiceHelpers");

function rollTheDices() {
  const results = [];
  return rollDice(1)
    .then((value) => {
      results.push(value);
      return rollDice(2);
    })
    .then((value) => {
      results.push(value);
      return rollDice(3);
    })
    .then((value) => {
      results.push(value);
      return rollDice(4);
    })
    .then((value) => {
      results.push(value);
      return rollDice(5);
    })
    .then((value) => {
      results.push(value);
      return results;
    });
}

rollTheDices()
  .then((results) => console.log("Resolved!", results))
  .catch((error) => console.log("Rejected!", error.message));

module.export = rollTheDices;
