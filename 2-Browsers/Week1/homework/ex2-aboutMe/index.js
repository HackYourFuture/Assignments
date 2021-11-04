'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-2-about-me

1. Using JavaScript, change the body tag's style so it has a font-family of 
   "Arial, sans-serif".
2. Using JavaScript, replace each of the spans (`nickname`, fav-food`, 
   `hometown`) with your own information.
3. In JavaScript, iterate through each `<li>` and change the class to 
   `list-item`.
------------------------------------------------------------------------------*/

// TODO add your JavaScript code here.
const body = document.body;
body.style.fontFamily = 'Arial, sans-serif';
const nickName = document.getElementById('nickname');
const favFood = document.getElementById('fav-food');
const homeTown = document.getElementById('hometown');
const myName = document.createTextNode('Ahmed');
const myBestFood = document.createTextNode('falafel');
const myHome = document.createTextNode('Amsterdam');
nickName.appendChild(myName);
favFood.appendChild(myBestFood);
homeTown.appendChild(myHome);
const className = document.querySelectorAll('li');
className.forEach((li) => {
  li.classList.add('list-item');
});
