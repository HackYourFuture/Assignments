"use strict";

function renderImage(data) {
  // TODO render the image to the DOM
  console.log(data);
}

function renderError(error) {
  // TODO render the error to the DOM
  console.log(error);
}

async function sendAxiosRequest(url) {
  // TODO complete this function
}

window.addEventListener("load", () =>
  sendAxiosRequest("https://dog.ceo/api/breeds/image/random")
);
