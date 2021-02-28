'use strict';
/*------------------------------------------------------------------------------
1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------*/
function addCurrentTime() {
    // every second, time is updated
    setInterval(addCurrentTime, 1000);

    // creating a paragraph with id called demo
    const para = document.createElement("P");
    para.id = 'demo';
    document.body.appendChild(para);
    
    //Current time
    const dt = new Date();
    const t =(("0"+dt.getHours()).slice(-2)) +":"+ (("0"+dt.getMinutes()).slice(-2))
    +":"+ (("0"+dt.getSeconds()).slice(-2));  
    document.getElementById("demo").innerHTML = t;

}

// TODO execute `addCurrentTime` when the browser has completed loading the page
document.addEventListener("DOMContentLoaded", addCurrentTime);