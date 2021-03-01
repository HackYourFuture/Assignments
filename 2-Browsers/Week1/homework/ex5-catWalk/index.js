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
const img = document.getElementsByTagName('img')[0]; // [0] i used it for first desired image, because it returns an array and i want to take first image
img.style.left = '0px';

let walkForwards = true;

//moving cat to right 10px
function catWalk() {

  let currentLeft = parseInt(img.style.left); //converting px to int number

  // The innerWidth property returns the width of a window's content area
  if (walkForwards && (currentLeft > (window.innerWidth-img.width))) {
    walkForwards = false;
  }

  if (!walkForwards && (currentLeft <= 0)) {
    walkForwards = true;
  }
  
  if (walkForwards) {
    img.style.left = (currentLeft + 10) + 'px';
  } 

  else {
    img.style.left = (currentLeft - 10) + 'px';
  }

}
window.setInterval(catWalk, 50);

// TODO execute `catWalk` when the browser has completed loading the page
                                                                                              