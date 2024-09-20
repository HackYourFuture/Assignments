import { createObservable } from './ex4-observable.js';

// A candidate subscriber function
function consoleUpperCase(message) {
  console.log(message.toUpperCase());
}

// Another candidate subscriber function
function consoleLowerCase(message) {
  console.log(message.toLowerCase());
}

// Create an observable object
const observable = createObservable();

// Add three subscribers
observable.subscribe(console.log);
observable.subscribe(consoleUpperCase);
observable.subscribe(consoleLowerCase);

// Send a message to all current subscribers
observable.notify("Let's see what happens here!");

// Expected output:
// Let's see what happens here!
// LET'S SEE WHAT HAPPENS HERE!
// let's see what happens here!
