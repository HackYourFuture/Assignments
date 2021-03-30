'use strict';
/*------------------------------------------------------------------------------
Use the VSCode Debugger to fix the bugs
--------------------------------------------------------------- --------------*/
const fetch = require('node-fetch');

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

function renderLaureate({ knownName, birth, death }) {
  console.log(`\nName: ${knownName.en}`);
  console.log(`Birth: ${birth.date}, ${birth.place.locationString.en}`);
  if (death) {
    console.log(`Death: ${death.date}, ${death.place.locationString.en}`);
  }
}

function renderLaureates(laureates) {
  laureates.forEach(renderLaureate);
}

async function fetchAndRender() {
  try {
    const { laureates } = await getData(
      'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    renderLaureates(laureates);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}

fetchAndRender();
