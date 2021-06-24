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
const API_URL = 'https://pokeapi.co/api/v2';

const fetchData = async (url) => {
  try {
    const data = await fetch(API_URL + url);
    return await data.json();
  } catch (error) {
    console.log(error);
  }
};

const styleEl = (el, styles) => {
  Object.keys(styles).forEach((style) => {
    el.style[style] = styles[style];
  });
};

const createEl = (type = 'div', id = '', styles = {}) => {
  const el = document.createElement(type);
  el.id = id || false;
  document.body.appendChild(el);
  styleEl(el, styles);
  return el;
};
const fetchAndPopulatePokemons = (src) => {
  const btn = createEl('button', 'btn', {
    marginLeft: '20vw',
  });
  btn.textContent = 'Get Pokemon!';
  btn.type = 'button';
  const select = createEl('select', 'select', {
    marginLeft: '20vw',
    display: 'flex',
  });
  const image = createEl('img', 'image', {
    marginLeft: '20vw',
    marginTop: '20px',
    width: '20vw',
  });
  image.src = src;
  image.alt = '';
  return {
    btn,
    select,
    image,
  };
};

async function fetchImage(data) {
  const { image, select } = fetchAndPopulatePokemons(data);
  Object.entries(data.results).forEach((result) => {
    const options = createEl('option');
    const name = result[1].name;
    options.textContent = name;
    select.appendChild(options);
  });
  select.addEventListener('change', async (e) => {
    const data = await fetchData('/pokemon/' + e.target.value);
    image.src = data.sprites.back_default;
  });
}

const main = async () => {
  const data = await fetchData('/pokemon');
  return fetchImage(data);
};

window.addEventListener('load', main);
