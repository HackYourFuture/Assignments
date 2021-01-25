"use strict";
/*------------------------------------------------------------------------------
1. Complete the function `getData()`. It should:

   - Take a `url` string as its parameter.
   - It should return a promise that resolves to the data returned from the Web 
     API.
   - It should return a rejected promise in case of HTTP errors and/or network 
     errors.

2. Complete the function body of the `.then()` method.

   - It should log the image data returned by `getData()` to the browser's 
     console.
   - It should dynamically create an `<img>` element and set its `src` property 
     from the data.
   - It should append the `<img>` element to the document's `<body>` element.

3. Complete the function body of the `.catch()` method.

   - It should log the error information to the browser's console.
------------------------------------------------------------------------------*/
function getData(/* TODO: parameters(s) go here */) {
  // TODO: complete this function
}

getData("https://xkcd.now.sh/?comic=latest")
  .then((/* TODO: parameters(s) go here */) => {
    // TODO: complete the function body
  })
  .catch((/* TODO: parameters(s) go here */) => {
    // TODO: complete the function body
  });
