"use strict";
/*------------------------------------------------------------------------------
Complete the function `getData()` as follows:

- It should get data from the url passed to it by the existing function `
  main()`.
- It should use the **axios** library to make the request.
- Your code should use a promise chain (`.then()`, `.catch()`) to handle the 
  response from axios.
- Stringify the data so that it can be rendered it as JSON to the page:

  const text = JSON.stringify(data, null, 2);

- Render the JSON string as a `<pre>` element appended to the `<body>` of the 
  DOM.
- Request errors should be logged the browser's console.
------------------------------------------------------------------------------*/
function getData(/* TODO: parameter(s) go here */) {
  // TODO: complete this function
}

function main() {
  getData("https://www.randomuser.me/api");
}

window.addEventListener("load", main);
