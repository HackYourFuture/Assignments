# Homework Using APIs Week 2

## Exercises

The homework for this week can be found in the `homework` folder.

### Exercise 1: Programmer Fun

#### Folder: `ex1-programmerFun`

Who knew programmers could be funny?

1. Complete the function `requestData()` using `XMLHttpRequest` to make a request to the url passed to it as an argument. The function should return a promise. Make sure that the promise is rejected in case of HTTP or network errors.
2. Notice that the function `main()` calls `requestData()`, passing it the url `https://xkcd.now.sh/?comic=latest`. Try and run the code in the browser and open the browser's console to inspect the data returned from the request.
3. Next, complete the function `renderImage()` to render an image as an `<img>` element appended to the document's body, using the data returned from the API.
4. Complete the function `renderError()` to render any errors as an `<h1>` element appended to the document's body.
5. Test error handling, for instance, by temporarily changing the `.sh` in the url with `.shx`. There is no server at the modified url, therefore this should result in a network (DNS) error.

### Exercise 2: Gotta catch 'em all

#### Folder `ex2-pokemonApp`

Let's catch all original 151 Pokemon in our own little web application! Here's an example of what you'll be building for this exercise:

![Pokemon App](../../assets/pokemon-app.gif)

In this exercise you're going to do several things:

1. Create and append DOM elements using JavaScript only.
2. Fetch data from a public API: <https://pokeapi.co/>
3. Display the results in the DOM.

#### Instructions

- Complete the four functions provided in the starter `index.js` file:

<!-- prettier-ignore -->
Function | Purpose
---------|--------
`fetchData` | In the `fetchData` function, make use of `fetch` and its Promise syntax in order to get the data from the public API. Errors (HTTP or network errors) should be logged to the console.
`fetchAndPopulatePokemons` | Use `fetchData()` to load the pokemon data from the public API and populates the `<select>` element in the DOM.
`fetchImage` | Use `fetchData()` to fetch the selected image and update the `<img>` element in the DOM.
`main` | The `main` function orchestrates the other functions. The `main` function should be executed when the window has finished loading.

- Use async/await and try/catch to handle promises.

- Try and avoid using global variables. Instead, use function parameters and return values to pass data back and forth.

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

### Exercise 4: Roll an ACE

#### File `ex4-rollAnAce.js`

Last week we did an exercise where we threw five dices in one go for a game of Poker Dice. In the current exercise we use a single dice only, but now the objective is to keep rethrowing that dice until we get an ACE, or until a dice rolls off the table.

The challenge of this exercise is that the outcome of one promise determines whether we need a next promise. If the `rollDice()` function resolves to an ACE then we're done. If not, we need another call to `rollDice()` and wait for it to resolve. And we need to repeat this until we get an ACE (or stop when the promise rejects).

The exercise file `ex4-rollAnAce.js` includes a function that does just that, using `.then()` methods. It uses a technique called _recursion_ and looks like this:

```js
function rollDiceUntil(wantedValue) {
  const recurse = () => {
    return rollDice().then((settledValue) => {
      if (settledValue !== wantedValue) {
        return recurse();
      }
      return settledValue;
    });
  };
  return recurse();
}
```

Hmm, while this works fine it is probably a bit difficult to wrap your head around. Even if you fully understand what it does (we don't expect you to, at this stage) it is easy to make a mistake, for instance, by forgetting to include a `return` somewhere.

Luckily, this code can be rewritten to be much simpler, using async/await:

1. Run the unmodified exercise and observe that it works as advertised. Observe that the dice must be thrown an unpredictable number of times until we get an ACE or until it rolls off the table.
2. Now, rewrite the body of the `rollDiceUntil()` function using async/await. Hint: a `while` loop may come handy.
3. Refactor the function `main()` to use async/await and try/catch.

### Dice Race

#### File `ex5-diceRace.js`

In this exercise we will again throw five dices in one go, but this time we are only interested in the first dice that comes to a standstill. This is something for which the `Promise.race()` method seems to be ideal. If you have managed to successfully complete exercise 4 from last week this one should be easy:

1. Complete the function `rollTheDices()` by using `Promise.race()`.
2. Refactor the function `main()` using async/await and try/catch.
3. Once you got this working, you may observe that some dices continue rolling for some undetermined time after the promise returned by `Promise.race()` resolves. Do you know why? Add your answer as a comment to the bottom of the file.
