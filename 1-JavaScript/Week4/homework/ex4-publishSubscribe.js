"use strict";
/*
A software pattern that you may encounter in the future is a construct called
the Observer Pattern. It enables "listeners" (which are usually functions) to
"subscribe" to "notifications" from a "publisher". Any number of listeners can
subscribe.

Look at the code below:

- The call to the `createPublisher` function returns an object. For ease of
  reference, let's call it a "Publisher" object here. The Publisher object has
  two properties, `subscribe` and `notify`, which are both functions. In this
  exercise you are required to complete them. (But continue reading first.)

- As you can see below, the `createPublisher` function is called and the
  resulting Publisher object is assigned to the `myPublisher` variable.

- Next, two "listener" functions are defined, notably `consoleUpperCase` and
  `consoleLowerCase`. A listener function is defined here as a function that
  takes a single parameter, `message`. It is up to the listener what to do
  with `message`. (The Publisher has no say in this!).

- The "listener" functions are added as "subscribers" to `myPublisher` by
  calling its `subscribe` function. The `subscribe` function should take the
  function passed to it as an argument and push it onto the `listeners` array.
  (Yes, you can store functions in an array. Functions are treated in JavaScript
  like any other value.

- The standard `console.log` function, which also conforms to the minimum
  requirement for a "listener" (although it can take more than one argument)
  is also added as a subscriber.

- Finally, a call to the Publisher's `notify` function is expected to iterate
  through, and call, all subscribers from the `listeners` array, passing on the
  notification message to each listener.

Good luck with completing `createPublisher`!
*/

function createPublisher() {
  const listeners = [];
  return {
    subscribe: function (/* TODO parameter(s) go here */) {
      // TODO complete this function
    },
    notify: function (/* TODO parameter(s) go here */) {
      // TODO complete this function
    },
  };
}

const myPublisher = createPublisher();

function consoleUpperCase(message) {
  console.log(message.toUpperCase());
}

function consoleLowerCase(message) {
  console.log(message.toLowerCase());
}

myPublisher.subscribe(console.log);
myPublisher.subscribe(consoleUpperCase);
myPublisher.subscribe(consoleLowerCase);

myPublisher.notify("Let's see what happens here!");
// Prints the following to the console
// "Let's see what happens here!"
// "LET'S SEE WHAT HAPPENS HERE!"
// "let's see what happens here!"

myPublisher.subscribe(function consoleReverse(message) {
  console.log(message.split("").reverse().join(""));
});

myPublisher.notify("Beware the closed Observer 0_o");
// Prints the following to the console
// "Beware the closed Observer 0_o!"
// "BEWARE THE CLOSED OBSERVER 0_O!"
// "beware the closed observer 0_o!"
// "!o_0 revresbO desolc eht eraweB"

// ! Do not change or remove the code below
module.exports = createPublisher;
