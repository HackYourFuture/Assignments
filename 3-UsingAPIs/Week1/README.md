# Homework Using APIs Week 1

## Exercises

The homework for this week can be found in the `homework` folder.

### Exercise 1: Who do we have here?

#### Folder: `ex1-whoHere`

Wouldn't it cool to make a new friend with just the click of a button?

Write a function that makes a HTTP Request to `https://www.randomuser.me/api`.

- Inside the JavaScript file write two functions: one with `XMLHttpRequest`, and the other with `axios`.
- Each function should make a HTTP Request to the given endpoint: `https://www.randomuser.me/api`.
- Log the received data to the console.
- Incorporate error handling: log to the console the error message.

### Exercise 2: Programmer humor

#### Folder: `ex2-programmerFun`

Who knew programmers could be funny?

Write a function that makes a HTTP Request to `https://xkcd.now.sh/?comic=latest`

- Inside the same file write two programs: one with `XMLHttpRequest`, and the other with `axios`.
- Each function should make a HTTP Request to the given endpoint: `https://xkcd.now.sh/?comic=latest`
- Log the received data to the console.
- Render the `img` property into an `<img>` tag in the DOM.
- Incorporate error handling: log to the console the error message.

### Exercise 3: Dog photo gallery

#### Folder: `dogPhotoGallery`

Let's make a randomized dog photo gallery!

Write a function that makes a HTTP Request to `https://dog.ceo/api/breeds/image/random`. It should trigger after clicking a button in your webpage. Every time the button is clicked it should append a new dog image to the DOM.

- Create an `index.html` file that will display your random image.
- Add two `<button>` and one `<ul>` element, either in the HTML or through JavaScript.
- Write two versions for the button functionality: one with `XMLHttpRequest`, and the other with `axios`.
- When any one of the two buttons is clicked it should make a HTTP Request to `https://dog.ceo/api/breeds/image/random`.
- After receiving the data, append to the `<ul>` a `<li>` that contains an `<img>` element with the dog image.
- Incorporate error handling: log to the console the error message.
