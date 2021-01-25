const moment = require("moment");

function logger(...args) {
  console.log(moment().format("HH:mm:ss.SSS"), ...args);
}

const createDiceRoller = (logFn) => (dice) => {
  return new Promise((resolve, reject) => {
    const rollTime = 450 + Math.floor(Math.random() * 50);
    const todo = Math.floor(Math.random() * 8) + 1;
    logFn(`[${dice}] Dice ${dice} starts ${todo} rolls...`);
    const rollOnce = (roll) => {
      const value = Math.floor(Math.random() * 6) + 1;
      logFn(`[${dice}] roll ${roll}: ${value}`);
      if (roll === todo) {
        logFn(`[${dice}] Dice ${dice} final value is ${value}.`);
        resolve(value);
      }
      if (roll > 6) {
        reject(new Error(`Oops... Dice ${dice} rolled off the table.`));
      }
      if (roll < todo) {
        setTimeout(() => rollOnce(roll + 1), rollTime);
      }
    };
    rollOnce(1);
  });
};

const rollDice = createDiceRoller(logger);

module.exports = { rollDice };
