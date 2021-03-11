/* eslint-disable no-autofix/prefer-const */
'use strict';
/*------------------------------------------------------------------------------
1. Create a variable to store a reference to the `<img>` element.
2. Change the style of the `<img>` to have a `left` of `0px`, so that it starts 
   at the left hand of the screen.
3. Complete the function called catWalk() to move the cat 10 pixels to the right
   of where it started, by changing the `left` style property.
4. Call that function every 50 milliseconds. Your cat should now be moving 
   across the screen from left to right. Hurrah!
5. When the cat reaches the right-hand of the screen, restart them at the left 
   hand side (`0px`). So they should keep walking from left to right across the 
   screen, forever and ever.
6. When the cat reaches the middle of the screen, replace the img with an image 
   of a cat dancing (use this URL: https://tenor.com/StFI.gif), keep it dancing 
   for 5 seconds, and then replace the img with the original image and have it 
   continue the walk.
-----------------------------------------------------------------------------*/
//crating img and changing style of img
const img = document.querySelector('img');
const dancingCat =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif?itemid=10561424';
const originalImgSrc = img.src;
const originalImgWidth = img.width;

function setCatPositionToBeginning() {
  img.style.left = '8px';
}
setCatPositionToBeginning();
function catWalk() {
  const currentPosition = parseFloat(img.style.left);
  img.style.left = (currentPosition + 8).toString().concat('px');
  const middlePosition = (window.innerWidth - originalImgWidth) / 2;
  if (
    currentPosition >= middlePosition - 8 &&
    currentPosition <= middlePosition + 8
  ) {
    clearInterval(interval);
    img.src = dancingCat;
    setTimeout(function () {
      img.src = originalImgSrc;
      img.style.left = (currentPosition + 10).toString().concat('px');
      interval = setInterval(catWalk, 50);
    }, 5000);
  }
  if (currentPosition > window.innerWidth) {
    setCatPositionToBeginning();
  }
}
let interval = setInterval(catWalk, 50);
// window.setInterval(catWalk, 50);

// TODO execute `catWalk` when the browser has completed loading the page
