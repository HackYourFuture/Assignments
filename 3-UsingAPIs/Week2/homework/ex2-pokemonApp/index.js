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
const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const body = document.querySelector('body');

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

function fetchAndPopulatePokemons(data) {
  const selectList = document.getElementById('mySelect');
  data.results.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.name;
    option.textContent = item.name;
    selectList.appendChild(option);
    option.addEventListener('click', async () => {
      await fetchImage(item);
    });
  });
}

function fetchImage(data) {
  const imgUrl = 'https://pokeapi.co/api/v2/pokemon/';
  let queryParam = '1';
  const lastPram = '/';
  const endpoint = `${imgUrl}${queryParam}${lastPram}`;
  let imgData = fetch(endpoint);
  const imgRes = imgData.json();
  const imgName = imgRes.name;
  const imgSrc = imgRes.sprites.back_default;

  while (imgName !== data.name) {
    for (let i = 2; i < 151; i++) {
      queryParam = i;
      imgData = fetch(endpoint);
    }
  }
  const imgBox = document.createElement('div');
  const img = document.createElement('img');
  imgBox.appendChild('img');
  body.appendChild(imgBox);
  img.src = imgSrc;
}
//unfortunately the pic can't show up in screen. I can't solve. I will wait for your hint.

function main() {
  body.style.display = 'flex';
  const btn = document.createElement('button');
  btn.textContent = 'Get Pokemon!';
  btn.type = 'submit';
  body.appendChild(btn);
  const selectList = document.createElement('select');
  selectList.id = 'mySelect';
  body.appendChild(selectList);
  btn.addEventListener('click', async () => {
    const res = await fetchData(url);
    fetchAndPopulatePokemons(res);
  });
}

window.addEventListener('load', main);
