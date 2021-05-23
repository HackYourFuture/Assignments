'use strict';
/*------------------------------------------------------------------------------
1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------*/
function addCurrentTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm = 'AM';

  if (hour > 12) {
    hour = hour - 12;
    am_pm = 'PM';
  }
  if (hour == 0) {
    hour = 12;
    am_pm = 'AM';
  }
  hour = hour < 10 ? '0' + hour : hour;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;

  let currentTime = hour + ':' + min + ':' + sec + ':' + am_pm;
  return currentTime;
}

const clock = document
  .querySelector('.clock-box')
  .addEventListener('click', addCurrentTime);

const body = document.querySelector('body');
const newDiv = document.createElement('div');
newDiv.className = 'clock-box';
newDiv.innerText = 'This clock div will be added to the body!';
newDiv.style.background = 'red';
body.appendChild(newDiv);

// addCurrentTime();

// TODO execute `addCurrentTime` when the browser has completed loading the page
