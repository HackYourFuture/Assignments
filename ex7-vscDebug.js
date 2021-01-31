'use strict';
/*------------------------------------------------------------------------------
Use the `console.log` and the VSCode Debugger to find and fix the bugs.
------------------------------------------------------------------------------*/
const fetch = require('node-fetch');

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

function render(laureates) {
  laureates.forEach(({ knownName, birth, death }) => {
    console.log(`\nName: ${knownName.en}`);
    console.log(`Birth: ${birth.date}, ${birth.place.locationString}`);
    console.log(`Death: ${death.date}, ${death.place.locationString}`);
  });
}

async function fetchAndRender() {
  try {
    const laureates = getData(
      'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    render(laureates);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}

fetchAndRender();

// ! Do not change or remove the code below
module.exports = fetchAndRender;
