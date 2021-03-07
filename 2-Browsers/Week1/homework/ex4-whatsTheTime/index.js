'use strict';
/*------------------------------------------------------------------------------
1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------*/
const para = document.createElement("P");
para.id = 'demo';

function addCurrentTime() {
 
    //Current time
    const dt = new Date();
    const hours   = ("0"+dt.getHours()).slice(-2);
    const minutes = ("0"+dt.getMinutes()).slice(-2);
    const seconds = (("0"+dt.getSeconds()).slice(-2));
    const t = hours +":"+ minutes +":"+ seconds;  
    document.getElementById("demo").innerHTML = t;

}

    // creating a paragraph with id called demo

document.body.appendChild(para);

// TODO execute `addCurrentTime` when the browser has completed loading the page

document.addEventListener("DOMContentLoaded", () => setInterval(addCurrentTime, 1000));