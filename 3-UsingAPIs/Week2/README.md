# Homework Using APIs Week 2

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

### Exercise 1: Promise me to wait

#### Folder: `ex1-promiseToWait`

In this exercise you'll practice refactoring `Promise` syntax into `async/await` + `try/catch` syntax. Rewrite exercise A & B using `async/await` + `try/catch` syntax.

```js
// Exercise A
function getData(url) {
  fetch(url)
    .then((response) => response.json)
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
}

getData("https://randomfox.ca/floof/");

// Exercise B
const arrayOfWords = ["cucumber", "tomatoes", "avocado"];

const makeAllCaps = (array) => {
  return new Promise((resolve, reject) => {
    const capsArray = array.map((word) => {
      if (typeof word === "string") {
        return word.toUpperCase();
      } else {
        reject("Error: Not all items in the array are strings!");
      }
    });
    resolve(capsArray);
  });
};

makeAllCaps(arrayOfWords)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

### Exercise 2: Trivia time

Don't you just love trivia games? Let's make our own!

In this exercise you'll make use of the [Open Trivia Database API](https://opentdb.com/). You are going to fetch 5 random trivia questions and then inject them into the DOM, inside of an accordion. It should behave similar to this:

![Trivia App](./../assets/trivia-app.gif)

Here are the requirements:

- Create a folder called `trivia-app`, that includes an HTML, CSS and JavaScript file
- Link them all together in the HTML file
- Only provide the basic structure in the HTML file. All other DOM elements are to be created using JavaScript
- No CSS frameworks are allowed!
- Sometimes the strings you get back from the API contains HTML entities (like `&quote;`). Find out a way to turn this into regular text
- Make use of the following endpoint: <https://opentdb.com/api.php?amount=5>

### Exercise 3: Gotta catch 'em all

> Inside of your `homework` folder, create another folder called `pokemon-app`. There, create an `index.html` and `script.js` file

Let's catch all original 151 Pokemon in our own little web application! Here's an example of what you'll be building for this exercise:

![Pokemon App](../../assets/pokemon-app.gif)

In this exercise you're going to do several things:

1. Create and append DOM elements using JavaScript only
2. Fetch data twice from a public API [PokeAPI](https://pokeapi.co/)
3. Display the results in the DOM.

Here are the requirements:

- Create 3 functions: `fetchData`, `addPokemonToDOM` and `main`
- The `main` function executes the other functions and contains all the variables
- In the `fetchData` function, make use of `fetch` and its Promise syntax in order to get the data from the public API
- Execute the `main` function when the window has finished loading
