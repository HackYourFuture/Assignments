"use strict";

const mondayTasks = [
  {
    name: "Daily standup",
    duration: 30, // specified in minutes
  },
  {
    name: "Feature discussion",
    duration: 120,
  },
  {
    name: "Development time",
    duration: 240,
  },
  {
    name: "Talk to different members from the product team",
    duration: 60,
  },
];

const hourlyRate = 25;

function computeEarnings(/* parameter(s) go here */) {
  // replace this comment with your code
}

const earnings = computeEarnings(mondayTasks, hourlyRate);
console.log(`Total earnings: ${earnings}`);

// Do not change or remove the code below
module.exports = {
  computeEarnings,
  mondayTasks,
  hourlyRate,
};
