'use strict';

// const { doc } = require('prettier');

// const { forEach } = require('lodash');
// const { Body } = require('node-fetch');

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

const url = 'https://pokeapi.co/api/v2/pokemon?limit=156';
const arr = [];
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      for (let i = 0; i < 156; i++) {
        arr.push(data.results[i].name);
      }
      return arr;
    }
  } catch (error) {
    console.log(error);
  }
}

function fetchAndPopulatePokemons(data) {
  // TODO complete this function
  const body = document.querySelector('body');
  body.style.display = 'flex';
  const btn = document.createElement('button');
  btn.textContent = 'Get Pokemon';
  body.appendChild(btn);
  // btn.addEventListener('click' fetchData());

  const selectList = document.createElement('select');
  selectList.id = 'mySelect';
  body.appendChild(selectList);
  console.log(arr);

  // let leng = data.results.length;
  // console.log(leng);
  // const arr = push(data.results);
  // console.log(arr.length);

  for (let i = 0; i < arr.length; i++) {
    const option = document.createElement('option');
    option.value = arr[i];
    option.text = arr[i];
    selectList.appendChild(option);
  }
}

function fetchImage(/* TODO parameter(s) go here */) {
  // TODO complete this function
  const img = document.createElement('img');
  img.src = data.img;
  document.querySelector('body').appendChild(img);
  console.log(data.img);
}

function main() {
  // TODO complete this function
  const displaySuggestions = (event) => {
    event.preventDefault();
    while (responseField.firstChild) {
      responseField.removeChild(responseField.firstChild);
    }
    getSuggestions();
  };

  submit.addEventListener('click', displaySuggestions);
}

fetchAndPopulatePokemons();
fetchData(url);

// window.onload = function () {
//   main();
// };
