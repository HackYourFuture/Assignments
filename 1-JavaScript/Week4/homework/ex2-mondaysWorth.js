'use strict';
/*
- Complete the function names `computeEarnings`. It should take an array of
  tasks and an hourly rate as arguments and return a formatted Euro amount
  (e.g: `€11.34`) comprising the total earnings.
- Use the `map` array function to take out the duration time for each task.
- Multiply each duration by a hourly rate for billing and sum it all up.
- Make sure the program can be used on any array of objects that contain a
  `duration` property with a number value.
*/
const mondayTasks = [{
        name: 'Daily standup',
        duration: 30, // specified in minutes
    },
    {
        name: 'Feature discussion',
        duration: 120,
    },
    {
        name: 'Development time',
        duration: 240,
    },
    {
        name: 'Talk to different members from the product team',
        duration: 60,
    },
];

const hourlyRate = 25;

function computeEarnings(tasks, hRate) {
    // created a new array with map() to take out the task duration.
    const taskDuration = tasks.map((tasks) => tasks.duration);
    // created another array to multiply the duration with the hourly rate.
    const sum = taskDuration.map((sum) => (sum * hRate) / 60);
    // used the reduce method to sum all earnings.
    const total = sum.reduce((a, b) => a + b, 0);
    // formatted the total earnings to display with 2 digits after the decimal point.
    const formatted = total.toFixed(2);

    // returned the formatted earnings.
    return `€${formatted}`;
}

// example use case
const earnings = computeEarnings(mondayTasks, hourlyRate);
console.log(`Total earnings: ${earnings}`); // -> "Total earnings: €187.50"

// ! Do not change or remove the code below
module.exports = {
    computeEarnings,
    mondayTasks,
    hourlyRate,
};