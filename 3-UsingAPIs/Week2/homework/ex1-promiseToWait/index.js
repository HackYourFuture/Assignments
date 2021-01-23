"use strict";
/*------------------------------------------------------------------------------
In this exercise you'll practice refactoring `Promise` syntax into 
`async/await` + `try/catch` syntax. Rewrite exercise A & B using 
`async/await` + `try/catch` syntax.
------------------------------------------------------------------------------*/
// TODO: convert to async/await + try/catch
function getData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
}

getData("https://randomfox.ca/floof/");

// Exercise B
const arrayOfWords = ["cucumber", "tomatoes", "avocado"];

const makeAllCaps = (array) => {
  return new Promise((resolve, reject) => {
    const capsArray = array.map((word) => {
      if (typeof word === "string") {
        return word.toUpperCase();
      } else {
        reject("Error: Not all items in the array are strings!");
      }
    });
    resolve(capsArray);
  });
};

// TODO: convert to async/await + try/catch
makeAllCaps(arrayOfWords)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
