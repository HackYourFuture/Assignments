# Homework Using APIs Week 2

## Exercises

The homework for this week can be found in the `homework` folder.

### Exercise 1: Programmer Fun

#### Folder: `ex1-programmerFun`

Who knew programmers could be funny?

1. Complete the function `requestData()` using `fetch()` to make a request to the url passed to it as an argument. The function should return a promise. Make sure that the promise is rejected in case of HTTP or network errors.
2. Notice that the function `main()` calls `requestData()`, passing it the url `https://xkcd.now.sh/?comic=latest`. Try and run the code in the browser and open the browser's console to inspect the data returned from the request.
3. Next, complete the function `renderImage()` to render an image as an `<img>` element appended to the document's body, using the data returned from the API.
4. Complete the function `renderError()` to render any errors as an `<h1>` element appended to the document's body.
5. Refactor the `main()` function to use `async/await`.
6. Test error handling, for instance, by temporarily changing the `.sh` in the url with `.shx`. There is no server at the modified url, therefore this should result in a network (DNS) error.

### Exercise 2: Gotta catch 'em all

#### Folder `ex2-pokemonApp`

Let's catch all original 151 Pokemon in our own little web application! Here's an example of what you'll be building for this exercise:

> ![Pokemon App](../../assets/pokemon-app.gif)
>
> Figure 1. Pokemon App example

In this exercise you're going to do several things:

1. Create and append DOM elements using JavaScript only.
2. Fetch data from a public API: <https://pokeapi.co/>
3. Display the results in the DOM.

#### Instructions

- Complete the four functions provided in the starter `index.js` file:

<!-- prettier-ignore -->
Function | Purpose
---------|--------
`fetchData` | In the `fetchData` function, make use of `fetch` and its Promise syntax in order to get the data from the public API. Make sure that you check for HTTP errors (`response.ok`) and throw an error if needed.
`fetchAndPopulatePokemons` | Use `fetchData()` to load the pokemon data on demand (i.e. when the button is pressed) from the public API and populate the `<select>` element in the DOM.
`fetchImage` | Use `fetchData()` to fetch the selected image and update the `<img>` element in the DOM. Use the url that was returned in the pokemon results array.
`main` | The `main` function should be executed when the window has finished loading and should initialize your app.
(other) | Feel free to add further helper functions if desired.

- Use async/await and try/catch to handle promises.

- Test your error handling code (the "unhappy path"). For instance, make the url invalid and verify that your code handles the resulting error correctly (no runtime errors / unhandled promise rejection warnings in the console). Check this for fetching the pokemons array as well as for fetching the image.

- Try and avoid using global variables. As much as possible, try and use function parameters and return values to pass data back and forth.

- Use the empty `style.css` files for styling. Use JavaScript to add class name attributes for elements that you wish to style.

### Exercise 3: Roll an ACE

#### File `ex3-rollAnAce.js`

Last week we did an exercise where we threw five dice in one go for a game of Poker Die. In the current exercise we use a single die only, but now the objective is to keep rethrowing that die until we get an ACE, or until a die rolls off the table.

The challenge of this exercise is that the outcome of one throw determines whether we need to do a next throw. If the `rollDie()` function resolves to an ACE then we're done. If not, we need another call to `rollDie()` and wait for it to resolve. And we need to repeat this until we get an ACE or until the promise rejects.

The exercise file `ex3-rollAnAce.js` includes a function that does just that, using a `.then()` method. It uses a technique called _recursion_ (a function that calls itself) and looks like this:

```js
function rollDiceUntil(wantedValue) {
  return rollDie().then((value) => {
    if (value !== wantedValue) {
      return rollDiceUntil(wantedValue);
    }
    return value;
  });
}
```

Hmm, while this works fine it is probably a bit difficult to wrap your head around. And it is easy to make a mistake, for instance, by forgetting to include a `return` keyword somewhere (speaking from experience here :wink:).

Luckily, this code can be rewritten to be much simpler, using async/await:

1. Run the unmodified exercise and observe that it works as advertised. Observe that the die must be thrown an indeterminate number of times until we get an ACE or until it rolls off the table.
2. Now, rewrite the body of the `rollDiceUntil()` function using async/await and without using recursion. Hint: a `while` loop may come handy.

   Note: Your solution should no longer use recursion (i.e. the function should not call itself).

3. Refactor the function `main()` to use async/await and try/catch.

### Exercise 4: Dice Race

#### File `ex4-diceRace.js`

In this exercise we will again throw five dice in one go, but this time we are only interested in the first die that settles successfully (promise resolved) or rolls off the table (promise rejected). This is something for which the `Promise.race()` method seems to be ideal. If you have managed to successfully complete exercise 4 from last week this one should be easy:

1. Complete the function `rollDice()` by using `.map()` on the `dice` array to create an array of promises for use with `Promise.race()`.
2. Refactor the function `main()` using async/await and try/catch.
3. Once you got this working, you may observe that some dice continue rolling for some undetermined time after the promise returned by `Promise.race()` resolves. Do you know why? Add your answer as a comment to the bottom of the file.

### Exercise 5: Using the VSCode Debugger

#### File: `ex5-vscDebug.js`

In this exercise we will practice working with the VSCode Debugger. You can just follow along as we go. Note that we will not work with the browser this time. Instead, all output will be logged to the terminal window.

> Read more about debuggers in general in the Study Guide: [Debuggers](https://hackyourfuture.github.io/study/#/tools/debuggers)

The exercise will make a fetch request to the [Nobel Prize API](https://www.nobelprize.org/about/developer-zone-2/) version 2 to obtain information about the Nobel Prize winners ("laureates"). Specifically, those that were born in the Netherlands. We will log this information to the console.

This is the expected output:

<!-- cspell:disable -->

```console
Name: Bernard L. Feringa
Birth: 1951-05-18, Barger-Compascuum, the Netherlands

Name: Christiaan Eijkman
Birth: 1858-08-11, Nijkerk, the Netherlands
Death: 1930-11-05, Utrecht, the Netherlands

...

Name: Tobias Asser
Birth: 1838-04-28, Amsterdam, the Netherlands
Death: 1913-07-29, the Hague, the Netherlands
```

<!-- cspell:enable -->

Let's examine the (buggy) starter code of this exercise first:

```js
const fetch = require('node-fetch');

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

function renderLaureate({ knownName, birth, death }) {
  console.log(`\nName: ${knownName.en}`);
  console.log(`Birth: ${birth.date}, ${birth.place.locationString}`);
  console.log(`Death: ${death.date}, ${death.place.locationString}`);
}

function renderLaureates(laureates) {
  laureates.forEach(renderLaureate);
}

async function fetchAndRender() {
  try {
    const laureates = getData(
      'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    renderLaureates(laureates);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}

fetchAndRender();
```

> The `fetch` function is normally only available in the browser. However, we can make it also available in node-based applications by use of a special library package, called `node-fetch`. This is the purpose of the `require()` call at the top of the file. You will learn more about using library packages in the Node.js curriculum module.

The developer/author wrote this initial code after playing a bit with the online demos on the Nobel Prize API site. Although seemingly well-structured, this code will prove not to work as planned. The challenge of this exercise is to find and fix the bugs (there are a couple of them). We will use the VSCode debugger as our preferred debugging tool.

Let's first run the unmodified starter code. When we do, we will get this rather disappointing output:

```console
Something went wrong: laureates.forEach is not a function
```

It is excellent that our code catches and handles errors, but when debugging we would like to have some more detailed error information than what we are getting now. One way of achieving this is to comment out the `try {` statement and the `catch` block so that errors are _not_ caught. By default we will then get an error message with a (call) _stack trace_ in the console. A less intrusive manner to achieve the same is to log the `stack` property of the `Error` object to the console inside the `catch` block, like this:

```js
async function fetchAndRender() {
  try {
    ...
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
    console.log(err.stack);
  }
}
```

This will give us some information where the error occurred:

<!-- cspell:disable -->

```console
Something went wrong: laureates.forEach is not a function
TypeError: laureates.forEach is not a function
    at renderLaureates (C:\Users\jimcr\dev\hackyourfuture\homework\3-UsingAPIs\Week2\homework\ex5-vscDebug.js:19:13)
    at fetchAndRender (C:\Users\jimcr\dev\hackyourfuture\homework\3-UsingAPIs\Week2\homework\ex5-vscDebug.js:27:5)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
```

<!-- cspell:enable -->

The stack trace gives us detailed information about the sequence of functions that have been called when the error occurred, from most recent to least recent. Of direct interest is the most recent call: we can see that the error occurred in line 19, column 13 of the file `ex5-vscDebug.js`:

```js
18| function renderLaureates(laureates) {
19|   laureates.forEach(renderLaureate);
20| }
```

Error messages in JavaScript can be a bit cryptic sometimes. We know that `.forEach()` should work for sure on an array. Since we trust JavaScript not to play tricks on us, we therefore conclude that, contrary to our expectation, the `laureates` value passed as an argument cannot possibly be an array.

Let's first try and add a `console.log` to see what the value of `laureates` actually is.

> :bulb: When you use `console.log` statements for debugging purposes it is helpful to label the output so that you know what is being logged. In the example below we used the label `laureates:`.

```js
function renderLaureates(laureates) {
  console.log('laureates:', laureates);
  laureates.forEach(renderLaureate);
}
```

When we run the code we now get:

<!-- cspell:disable -->

```js
laureates: Promise { <pending> }
Something went wrong: laureates.forEach is not a function
TypeError: laureates.forEach is not a function
    at renderLaureates (C:\Users\jimcr\dev\hackyourfuture\homework\3-UsingAPIs\Week2\homework\ex5-vscDebug.js:20:13)
    at fetchAndRender (C:\Users\jimcr\dev\hackyourfuture\homework\3-UsingAPIs\Week2\homework\ex5-vscDebug.js:28:5)
    at Object.<anonymous> (C:\Users\jimcr\dev\hackyourfuture\homework\3-UsingAPIs\Week2\homework\ex5-vscDebug.js:35:1)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Module.require (internal/modules/cjs/loader.js:952:19)
    at require (internal/modules/cjs/helpers.js:88:18)
    at runExercise (C:\Users\jimcr\dev\hackyourfuture\homework\test-runner\run-it.js:54:7)
```

<!-- cspell:enable -->

Ah-ha, we were expecting an array but actually got a (pending) Promise. If we look again at the stack trace (second line in the trace) we can see that the `renderLaureates()` function was called by the `fetchAndRender()` function in line 28, passing the variable `laureates` as an argument. This variable was initialized just before the call. We now realize that we forgot to add the `await` keyword before the call to `getData()` to await for the promise returned by `getData()` to be resolved. (Forgetting to add `await` is an easy mistake to make.) Let's fix that:

```js
async function fetchAndRender() {
  try {
    const laureates = await getData(
      'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    renderLaureates(laureates);
  } catch (err) {
    ...
  }
}
```

Let's now run the code again:

<!-- cspell:disable -->

```console
{
  laureates: [
    {
      id: '933',
      knownName: [Object],
      givenName: [Object],
      familyName: [Object],
      fullName: [Object],
      gender: 'male',
      birth: [Object],
      links: [Object],
      nobelPrizes: [Array]
    },
    ...
    {
      id: '478',
      knownName: [Object],
      givenName: [Object],
      familyName: [Object],
      fullName: [Object],
      gender: 'male',
      birth: [Object],
      death: [Object],
      links: [Object],
      nobelPrizes: [Array]
    }
  ],
  meta: { offset: 0, limit: 25, birthCountry: 'Netherlands', count: 18 },
  links: {
    first: 'http://masterdataapi.nobelprize.org/2.0/laureates?offset=0&limit=25&birthCountry=Netherlands',
    self: 'http://masterdataapi.nobelprize.org/2.0/laureates?offset=0&limit=25&birthCountry=Netherlands',
    last: 'http://masterdataapi.nobelprize.org/2.0/laureates?offset=0&limit=25&birthCountry=Netherlands'
  }
}
Something went wrong: laureates.forEach is not a function
TypeError: laureates.forEach is not a function
    at renderLaureates (C:\Users\jimcr\dev\hackyourfuture\homework\3-UsingAPIs\Week2\homework\ex5-vscDebug.js:20:13)
    at fetchAndRender (C:\Users\jimcr\dev\hackyourfuture\homework\3-UsingAPIs\Week2\homework\ex5-vscDebug.js:28:5)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
```

<!-- cspell:enable -->

Woww, that is a lot of output, but still not right. But at least we are getting some form of data. Let's switch from using `console.log()` to the VSCode debugger as our preferred debugging tool. First, delete the temporary `console.log` line we added to the `renderLaureates()` function.

> A quick way to delete a line is to place the cursor anywhere on that line and press a keyboard shortcut:
>
> | Operating system | Key combination |
> | ---------------- | --------------- |
> | MacOS            | ⇧⌘K             |
> | Windows          | Ctrl+Shift+K    |
> | Linux            | Ctrl+Shift+K    |
>
> Table 1. Keyboard shortcuts for Delete Line.

Now, from the VSCode side bar, click on the Debug button (indicated by the red arrow in Figure 2).

> ![Debug button](../../assets/debug-button.png)
>
> Figure 2. Debug button.

From the resulting screen, select **JavaScript Debug Terminal** (Figure 3):

> ![Debug Terminal button](../../assets/debug-terminal-button.png)
>
> Figure 3. Debug options.

This will open a VSCode Integrated Terminal at the bottom of the screen. You can see that this is a Debug Terminal and not a regular terminal by inspecting the drop-down in the upper-right corner of the terminal panel (Figure 4):

> ![Terminal drop-down](../../assets/terminal-dropdown.png)
>
> Figure 4. Integrated Terminal drop-down.

You can have multiple terminal windows open in VSCode and switch between them using this drop-down. For now, we will stick to the Debug Terminal.

We can now place a **breakpoint** on line 19 by clicking in to the left of the number 19 in the left margin of the editor pane until a red dot appears, as shown in Figure 5 (to remove it, click the dot again):

> ![Breakpoint set at line 21](../../assets/breakpoint-19.png)
>
> Figure 5. Breakpoint set at line 19.

A **breakpoint** is a location in our code where we would like the JavaScript engine to pause execution when we run the program with the debugger attached. Let's give that a try and see what it looks like. We'll use the convenient command `npm run it` again (Figure 6 - notice the line where it says _Debugger attached._):

> ![Debugger attached](../../assets/debugger-attached.png)
>
> Figure 6. Debugger Attached.

We can inspect the call stack and any breakpoints that were placed in the lower left portion of the screen, as shown in Figure 6.

When executing code with the debugger, execution pauses as soon as a breakpoint is "_hit_". In Figure 7 we can see that execution is paused at our breakpoint in line 19. This is indicated by the yellow marker enclosing the red dot of the breakpoint.

> ![Breakpoint ght at line 19](../../assets/breakpoint-hit-19.png)
>
> Figure 7. Breakpoint hit at line 19.

There are several things we can inspect while the execution is paused. For instance, as shown in Figure 7, we can hover the mouse pointer over the `laureates` parameter of the `renderLaureates()` function to inspect its value at this point in the execution. Array and object values can be expanded by pressing the triangular right-arrow.

We can also inspect variables and the scopes in which they exist. In Figure 8 we have expanded the `laureates` variable. It appears that this variable is not an array, as we had assumed, but a JavaScript object with a `laureates` property containing an array.

> ![Debug variables](../../assets/debug-variables.png)
>
> Figure 8. Variables and scopes

With that knowledge we can fix the problem under inspection, using modern JS **object destructuring**: we can simply enclose the variable `laureates` in curly braces to indicate that we want to assign to it the value of the `laureates` property rather than the data object itself. But first we need to let the debugger finish the current execution. Press the blue triangle button in the top left part of the screen (see Figure 8) to resume execution.

```js
async function fetchAndRender() {
  try {
    // object destructuring curly braces added:
    const { laureates } = await getData(
      'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    renderLaureates(laureates);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}
```

When we run the code again in the debugger we can see (Figure 9) that the `laureates` variable is now the array we expected.

> ![Object destructuring](../../assets/object-destructuring.png)
>
> Figure 9. Variable `laureates` after object-destructuring.

Next, click on the blue triangle button to resume execution. Hmm, this output still doesn't look right:

<!-- cspell:disable -->

```console
Name: Bernard L. Feringa
Birth: 1951-05-18, [object Object]
Something went wrong: Cannot read property 'date' of undefined
TypeError: Cannot read property 'date' of undefined
    at renderLaureate (C:\Users\jimcr\dev\hackyourfuture\homework\3-UsingAPIs\Week2\homework\ex5-vscDebug.js:15:31)
    at Array.forEach (<anonymous>)
    at renderLaureates (C:\Users\jimcr\dev\hackyourfuture\homework\3-UsingAPIs\Week2\homework\ex5-vscDebug.js:19:13)
    at fetchAndRender (C:\Users\jimcr\dev\hackyourfuture\homework\3-UsingAPIs\Week2\homework\ex5-vscDebug.js:27:5)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
Waiting for the debugger to disconnect...
Waiting for the debugger to disconnect...
```

<!-- cspell:enable -->

Apparently, where we expected an object with a `date` property, we actually got an undefined value in line 15 of the function `renderLaureate()`. By inspecting line 15 we can infer that the object in question is the `death` object. Let's place another breakpoint on line 15, but this time we will make it a _conditional_ breakpoint. Right-click to the left of the number 15 in the margin of the editor window and select **Add conditional breakpoint...** from the context menu. Enter the condition that we want to break on: `death === undefined`, as illustrated in Figure 10.

> ![Set conditional breakpoint](../../assets/set-conditional-breakpoint.png)
>
> Figure 10. Setting a conditional breakpoint.

When we run the code again, first the breakpoint at line 19 will be hit. Press the blue triangle button again to resume execution. Next the breakpoint at line 15 will be hit when the condition is satisfied. Inspecting the `Variables` panel reveals the laureate in question is still alive because his death is `undefined`. We humbly acknowledge that this is a perfectly reasonable possibility that our code must be able to deal with.

> ![Conditional breakpoint hit](../../assets/conditional-breakpoint-hit.png)
>
> Figure 11. Conditional breakpoint hit.

We will add an `if` statement to take care of it (we will test for `death` being _thruthy_):

```js
function renderLaureate({ knownName, birth, death }) {
  console.log(`\nName: ${knownName.en}`);
  console.log(`Birth: ${birth.date}, ${birth.place.locationString}`);
  if (death) {
    console.log(`Death: ${death.date}, ${death.place.locationString.}`);
  }
}
```

Let's remove the two breakpoints by right-clicking on them and selecting **Remove Breakpoint** from the context menu.

Now, when we run the code again we get close to the desired result:

<!-- cspell:disable -->

```console
Name: Bernard L. Feringa
Birth: 1951-05-18, [object Object]

Name: Christiaan Eijkman
Birth: 1858-08-11, [object Object]
Death: 1930-11-05, [object Object]

...


Name: Tobias Asser
Birth: 1838-04-28, [object Object]
Death: 1913-07-29, [object Object]
Waiting for the debugger to disconnect...
Waiting for the debugger to disconnect...
```

<!-- cspell:enable -->

We still have an issue with displaying the locations for `birth` and `death`. We will leave this as a debugging exercise for you to finish. Don't forget to remove the `console.log` statement for the stack trace in the `catch` block when you're done. It is fine for us developers but regular users may get confused or alarmed when confronted with a stack trace.

For more information about the VSCode debugger, visit: [Debugging in Visual Studio Code](https://code.visualstudio.com/docs/editor/debugging).

### Exercise 6: Using the Browser Debugger

#### Folder: `ex6-browserDebug`

This exercise is about debugging similar code as in the previous one, but this time the program is web-based. Instead of the VSCode Debugger you must now use the debugger built into the browser, which has very similar features. Rather than repeating all the steps in detail here, we refer you to an excellent tutorial how to use this tool out on the web:

- [The definitive guide to JavaScript Debugging [2021 Edition]](https://dev.to/atapas/the-definitive-guide-to-javascript-debugging-2021-edition-116n)
