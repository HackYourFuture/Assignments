'use strict';
/*------------------------------------------------------------------------------
1. Using JavaScript, change the body tag's style so it has a font-family of 
   "Arial, sans-serif".
2. Using JavaScript, replace each of the spans (`nickname`, fav-food`, 
   `hometown`) with your own information.
3. In JavaScript, iterate through each `<li>` and change the class to 
   `list-item`.
------------------------------------------------------------------------------*/

// TODO add your JavaScript code here.

const body = document.querySelector('body');
body.style.fontFamily = 'Arial, sans-serif';

const name = document.getElementById('nickname');
name.textContent = 'Hudawaerdi Aibaidula';

const favFood = document.getElementById('fav-food');
favFood.textContent = 'Pilav, Doner, Pitsa';

const home = document.getElementById('hometown');
home.textContent = 'Urumqi';
const liElement = document.getElementsByTagName('li');

for (let i = 0; i < liElement.length; i++) {
  liElement[i].className = 'list-item';
}
//each <li> should rendered red  , i can't understand what they want to say 'rendered red'
