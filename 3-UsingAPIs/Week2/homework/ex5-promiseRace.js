const rollDice = require("../../helpers/pokerDiceRoller");

function rollTheDices() {
  const dices = [1, 2, 3, 4, 5];
  // TODO complete this function; use rollDice
}

//
rollTheDices()
  .then((results) => console.log("Resolved!", results))
  .catch((error) => console.log("Rejected!", error.message));

module.export = rollTheDices;
