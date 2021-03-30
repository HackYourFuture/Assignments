'use strict';
/*------------------------------------------------------------------------------
Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populates the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Try and avoid using global variables. Instead, use function parameters and 
return values to pass data back and forth.
------------------------------------------------------------------------------*/
const body = document.querySelector('body');
const button = document.createElement('button');
const select = document.createElement('select');
const image = document.createElement('img');
button.type = 'submit';
image.style.width = '200px';
button.textContent = 'Get Pokemon';
body.appendChild(button);
body.appendChild(select);
body.appendChild(image);

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network Error');
  }
  const data = await response.json();
  return data.results;
}

function fetchAndPopulatePokemons(data) {
  // TODO complete this function
  data.forEach((item) => {
    const option = document.createElement('option');
    select.appendChild(option);
    option.value = item.name;
    option.textContent = item.name;
  });
  select.addEventListener('change', fetchImage);
}
async function fetchImage() {
  // TODO complete this function
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${select.value}`
  );
  const data = await response.json();
  button.addEventListener('click', () => {
    image.src = data.sprites.front_default;
    image.alt = select.value;
  });
}

async function main() {
  // TODO complete this function
  try {
    const data = await fetchData(
      'https://pokeapi.co/api/v2/pokemon/?limit=151'
    );
    fetchAndPopulatePokemons(data);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', main);
