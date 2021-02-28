/* eslint-disable no-autofix/prefer-const */
'use strict';
/*------------------------------------------------------------------------------
1. Using JavaScript, change the body tag's style so it has a font-family of 
   "Arial, sans-serif".
2. Using JavaScript, replace each of the spans (`nickname`, fav-food`, 
   `hometown`) with your own information.
3. In JavaScript, iterate through each `<li>` and change the class to 
   `list-item`.
------------------------------------------------------------------------------*/


document.body.style.fontFamily = 'Arial, sans-serif';
document.getElementById('nickname').textContent = 'Oki';
document.getElementById('fav-food').textContent = 'badminton';
document.getElementById('hometown').textContent = 'where';
let items = document.getElementsByTagName('li');
for (let i = 0; i < items.length; i++) {
   items[i].className = 'list-item';
}

 let myPic = document.createElement('img');
 myPic.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Princess_Bubblegum.png/100px-Princess_Bubblegum.png';
 myPic.alt = 'imagenpm test'
 document.body.appendChild(myPic);

