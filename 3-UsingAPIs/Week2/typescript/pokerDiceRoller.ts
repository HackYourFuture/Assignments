//-----------------------------------
// ! This file should not be changed!
//-----------------------------------

const underTest = process.env.NODE_ENV === 'test';

// JavaScript library to work with time: https://momentjs.com/docs/
import moment from 'moment';

// These are the six faces on a poker die.
export type DieFace = 'NINE' | 'TEN' | 'JACK' | 'QUEEN' | 'KING' | 'ACE';

const faces: DieFace[] = ['NINE', 'TEN', 'JACK', 'QUEEN', 'KING', 'ACE'];

// The maximum number of rolls the die should make.
const MAX_ROLLS = 8;

// The maximum number of rolls the die should make.
const MIN_ROLLS = 3;

// The number of rolls after which the die rolls off the table.
const OFF_TABLE_AFTER = 6;

// The number of milliseconds between rolls
const ROLL_TIME = underTest ? 0 : 500;

// The couple of possible roll orders of the side on which the dice can roll.
// The number represent indexes into the `sides` array. The roll order to use
// is randomly selected.
// For a visual illustration see:
// https://github.com/HackYourFuture/Assignments/blob/main/assets/flattened-die.png
const rollOrders = [
  [1, 5, 4, 0],
  [3, 5, 2, 0],
  [0, 4, 5, 1],
  [0, 2, 5, 3],
];

/**
 * A logger function that timestamps the console.log output
 */
const logStamped = (...args: any): void => {
  if (underTest) {
    return;
  }
  console.log(moment().format('HH:mm:ss.SSS'), ...args);
};

/**
 * A convenience function to get a random integer: 0 <= n < max
 */
const getRandomNumber = (max: number): number =>
  Math.floor(Math.random() * max);

/**
 * Roll a die and return the side it lands on.
 */
export function rollDie(die: number = 1): Promise<DieFace> {
  return new Promise((resolve, reject) => {
    // Introduce a slightly random variation in roll time.
    const rollTime = ROLL_TIME - 5 + getRandomNumber(10);

    // Select a random roll order.
    const rollOrder = rollOrders[getRandomNumber(rollOrders.length)];

    // Start the roll on a random side.
    const offset = getRandomNumber(rollOrder.length);

    // Select a random number of roles to do before the die settles on a
    // side.
    const randomRollsToDo =
      getRandomNumber(MAX_ROLLS - MIN_ROLLS + 1) + MIN_ROLLS;

    logStamped(`Die ${die} scheduled for ${randomRollsToDo} rolls...`);

    let offTable = false;

    /**
     * Function that executes a roll, called recursively until the mandated
     *
     * @param {number} roll
     */
    const rollOnce = (roll: number) => {
      // Compute the index of the side in the roll (round-robin fashion)
      const index = rollOrder[(roll + offset) % 4];
      const side = faces[index];
      logStamped(`Die ${die} is now: ${side}`);

      // If the die rolls of the table we reject the promise (but that
      // doesn't stop the die from completing it course).
      if (roll > OFF_TABLE_AFTER) {
        if (!offTable) {
          logStamped(`Die ${die} continues rolling on the floor...`);
          offTable = true;
        }
        reject(new Error(`Die ${die} rolled off the table.\n`));
      }

      // If the dice settles (i.e. all mandated rolls are completed) we
      // resolve the promise.
      if (roll === randomRollsToDo) {
        const word = roll === 1 ? 'roll' : 'rolls';
        logStamped(`Die ${die} settles on ${side} in ${roll} ${word}.`);
        resolve(side);
      }

      // If the die has more rolls to do, schedule execution of the next roll.
      if (roll < randomRollsToDo) {
        setTimeout(() => rollOnce(roll + 1), rollTime);
      }
    };

    // Start the first roll.
    rollOnce(1);
  });
}
