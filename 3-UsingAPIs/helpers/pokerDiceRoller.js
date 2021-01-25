//-----------------------------------
// ! This file should not be changed!
//-----------------------------------

const moment = require("moment");

const faces = ["NINE", "TEN", "JACK", "QUEEN", "KING", "ACE"];

const rollOrders = [
  [1, 5, 4, 0],
  [3, 5, 2, 0],
  [0, 4, 5, 1],
  [0, 2, 5, 3],
];

const logger = (...args) =>
  console.log(moment().format("HH:mm:ss.SSS"), ...args);

const getRandomNumber = (max) => Math.floor(Math.random() * max);

const createDiceRoller = (logFn) => (dice) => {
  return new Promise((resolve, reject) => {
    const rollTime = 495 + getRandomNumber(10);
    const rollOrder = rollOrders[getRandomNumber(4)];
    const offset = getRandomNumber(4);
    const todo = getRandomNumber(8) + 1;
    logFn(`Dice ${dice} starts rolling...`);
    const rollOnce = (roll) => {
      const index = rollOrder[(roll + offset) % 4];
      const face = faces[index];
      logFn(`Dice ${dice} is now: ${face}`);
      if (roll === todo) {
        const word = roll === 1 ? "roll" : "rolls";
        logFn(`Dice ${dice} settles on ${face} in ${roll} ${word}.`);
        resolve(face);
      }
      if (roll > 6) {
        reject(new Error(`Dice ${dice} rolled off the table.`));
      }
      if (roll < todo) {
        setTimeout(() => rollOnce(roll + 1), rollTime);
      }
    };
    rollOnce(1);
  });
};

const rollDice = createDiceRoller(logger);

module.exports = rollDice;
