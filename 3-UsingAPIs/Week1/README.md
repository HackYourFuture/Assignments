# Homework Using APIs Week 1

## Exercises

The homework for this week can be found in the `homework` folder.

### Exercise 1: John who?

### File: `ex1-johnWho.js`

Take a look at the following function (and try it out in your console):

```js
const getAnonName = (firstName, callback) => {
  setTimeout(() => {
    if (!firstName) {
      callback(new Error("You didn't pass in a first name!"));
      return;
    }

    const fullName = `${firstName} Doe`;

    callback(fullName);
  }, 1000);
};

getAnonName("John", console.log);
```

Rewrite this function, but replace the callback syntax with the Promise syntax:

- Have the `getAnonName` function return a `new Promise`.
- If the Promise `resolves`, pass the full name as an argument to resolve with.
- If the Promise `rejects`, pass an error as the argument to reject with: "You didn't pass in a first name!"

### Exercise 2: Is it a double digit number?

#### File: `checkDoubleDigits.js`

Complete the function called `checkDoubleDigits` such that:

- It takes one argument: a number
- It returns a `new Promise`.
- If the number between 10 and 99 it should resolve to the string "This is double digit number!".
- For any other number it should reject with an an Error object containing: "Expected a double digit number but got `number`", where `number` is the number that was passed as an argument.

### Exercise 3: Programmer humor

#### Folder: `ex2-programmerHumor`

Who knew programmers could be funny?

Write a program that makes an HTTP Request to: `https://xkcd.now.sh/?comic=latest`

1. Complete the function `getData()`. It should:

   - Take a `url` string as its parameter.
   - It should return a promise that resolves to the data returned from the Web API.
   - It should return a rejected promise in case of HTTP errors and/or network errors.

2. Complete the function body of the `.then()` method.

   - It should log the image data returned by `getData()` to the browser's console.
   - It should dynamically create an `<img>` element and set its `src` property from the data.
   - It should append the `<img>` element to the document's `<body>` element.

3. Complete the function body of the `.catch()` method.

   - It should log the error information to the browser's console.

### Exercise 4: Who do we have here?

### Folder: `ex4-whoHere`

Wouldn't it cool to make a new friend with just the click of a button?

Complete the function `getData()` as follows:

- It should get data from the url passed to it by the existing function `main()`.
- It should use the **axios** library to make the request.
- Your code should use a promise chain (`.then()`, `.catch()`) to handle the response from axios.
- Stringify the data so that it can be rendered it as JSON to the page:

  ```js
  const text = JSON.stringify(data, null, 2);
  ```

- Render the JSON string as a `<pre>` element appended to the `<body>` of the DOM.
- Request errors should be logged the browser's console.
