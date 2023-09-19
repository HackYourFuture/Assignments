'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-2-about-me

1. Using JavaScript, replace each of the spans (`nickname`, fav-food`, 
   `hometown`) with your own information.
2. In JavaScript, iterate through each `<li>` and change the class to 
   `list-item`.
3. Look in the css file!
------------------------------------------------------------------------------*/

// TODO add your JavaScript code here.
function main(){
   const nickname = document.getElementById("nickname")
   nickname.innerText = "Roba"
   const favorite = document.getElementById("fav-food")
   favorite.innerText = "Enjera"
   const hometown = document.getElementById("hometown")
   hometown.innerText = "Tigray"
   
   const allItems = document.getElementById("allItems")
   const eachList = allItems.children
   for(let i=0;i<eachList.length;i++){
   eachList[i].classList.add("list-item")
   }

}
main()