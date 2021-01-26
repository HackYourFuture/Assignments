"use strict";

function requestData(url) {
  // TODO return a promise using XMLHttpRequest
  // TODO handle both HTTP and network errors
}

function renderImage(data) {
  // TODO render the image to the DOM
  console.log(data);
}

function renderError(error) {
  // TODO render the error to the DOM
  console.log(error);
}

// TODO refactor with async/await and try/catch
function main() {
  requestData("https://xkcd.now.sh/?comic=latest")
    .then((data) => {
      renderImage(data);
    })
    .catch((error) => {
      renderError(error);
    });
}

window.addEventListener("load", main);
