const { rollDice } = require("./pokerDiceHelpers");

function rollTheDices() {
  // TODO: Complete this function
}

rollTheDices()
  .then((results) => console.log("Resolved!", results))
  .catch((error) => console.log("Rejected!", error.message));

module.export = rollTheDices;
