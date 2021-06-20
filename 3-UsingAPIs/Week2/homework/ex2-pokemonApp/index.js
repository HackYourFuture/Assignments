'use strict';

const { forEach } = require('lodash');
const { Body } = require('node-fetch');

/*------------------------------------------------------------------------------
Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

function fetchAndPopulatePokemons(/* TODO parameter(s) go here */) {
  // TODO complete this function
  const img = document.createElement('img');
  document.querySelectorAll('body').appendChild(select);
}

function fetchImage(/* TODO parameter(s) go here */) {
  // TODO complete this function
  const imgScr = response.img;
}

function main() {
  // TODO complete this function
}
