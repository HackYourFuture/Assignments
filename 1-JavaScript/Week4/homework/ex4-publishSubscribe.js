'use strict';
/*
A software pattern that you may encounter in the future is a construct called
the Observer Pattern. It enables "subscribers" (which are usually functions) to
"subscribe" to "notifications" from a "publisher". Any number of subscribers can
subscribe.

Look at the code below:

- The call to the `createPublisher` function returns an object. For ease of
  reference, let's call it a "Publisher" object here. The Publisher object has
  two properties, `subscribe` and `notify`, which are both functions. In this
  exercise you are required to complete them. (But continue reading first.)

- As you can see below, the `createPublisher` function is called and the
  resulting Publisher object is assigned to the `myPublisher` variable.

- Next, two "subscriber" functions are defined, notably `consoleUpperCase` and
  `consoleLowerCase`. A subscriber function is defined here as a function that
  takes a single parameter, `message`. It is up to the subscriber what to do
  with `message`. (The Publisher has no say in this!).

- The "subscriber" functions are added as "subscribers" to `myPublisher` by
  calling its `subscribe` function. The `subscribe` function should take the
  function passed to it as an argument and push it onto the `subscribers` array.
  (Yes, you can store functions in an array. Functions are treated in JavaScript
  like any other value.

- The standard `console.log` function, which also conforms to the minimum
  requirement for a "subscriber" (although it can take more than one argument)
  is also added as a subscriber.

- Finally, a call to the Publisher's `notify` function is expected to iterate
  through, and call, all subscribers from the `subscribers` array, passing on the
  notification message to each subscriber.

Good luck with completing `createPublisher`!
*/

function createPublisher() {
  const subscribers = [];
  return {
    subscribe(item) {
      subscribers.push(item);
    },
    notify(item) {
      subscribers.forEach((data) => data(item));
    },
  };
}

// A candidate subscriber function
function consoleUpperCase(message) {
  console.log(message.toUpperCase());
}

// Another candidate subscriber function
function consoleLowerCase(message) {
  console.log(message.toLowerCase());
}

// Create a publisher object
const myPublisher = createPublisher();

// Register three subscribers
myPublisher.subscribe(console.log);
myPublisher.subscribe(consoleUpperCase);
myPublisher.subscribe(consoleLowerCase);

// Send a message to all current subscribers
myPublisher.notify("Let's see what happens here!");
// Let's see what happens here! (console.log subscriber)
// LET'S SEE WHAT HAPPENS HERE! (consoleUpperCase subscriber)
// let's see what happens here! (consoleLowerCase subscriber)

// Register a new subscriber
myPublisher.subscribe((message) => {
  console.log(message.split(' ').reverse().join(' '));
});

// Send another message to all current subscribers
myPublisher.notify('Alice answers your questions Bob');
// Prints the following to the console
// Alice answers your questions Bob (console.log subscriber)
// ALICE ANSWERS YOUR QUESTIONS BOB (consoleUpperCase subscriber)
// alice answers your questions bob (consoleLowerCase subscriber)
// Bob questions your answers Alice (arrow function subscriber)

// ! Do not change or remove the code below
module.exports = createPublisher;
