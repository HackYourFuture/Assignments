"use strict";
/*------------------------------------------------------------------------------
In this exercise you'll practice refactoring `Promise` syntax into 
`async/await` + `try/catch` syntax. Rewrite exercise A & B using 
`async/await` + `try/catch` syntax.
------------------------------------------------------------------------------*/
function renderImage(data) {
  // TODO render the image to the DOM
  console.log(data);
}

function renderError(error) {
  // TODO render the error to the DOM
  console.log(error);
}

async function requestData(url) {
  // TODO complete this function
}

window.addEventListener("load", () =>
  requestData("https://randomfox.ca/floof/")
);
