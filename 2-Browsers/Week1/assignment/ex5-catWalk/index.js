const cat = document.querySelector('img');

const walkingCatUrl = 'http://www.anniemation.com/clip_art/images/cat-walk.gif';
const dancingCatUrl =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

let screenWidth = window.innerWidth;
let catWidth = cat.width;
let screenMiddle = (screenWidth - catWidth) / 2;

let catPosition = 0;
let movementInterval;

function catWalk() {
  const isCatInMiddle =
    catPosition >= screenMiddle && catPosition < screenMiddle + 10;

  if (isCatInMiddle) {
    cat.src = dancingCatUrl;
    clearInterval(movementInterval);
    setTimeout(() => {
      cat.src = walkingCatUrl;
      movementInterval = setInterval(catWalk, 50);
    }, 5000);
  }

  if (catPosition >= screenWidth) {
    catPosition = -catWidth;
  }

  catPosition += 10;
  cat.style.left = `${catPosition}px`;
}

window.addEventListener('load', () => {
  movementInterval = setInterval(catWalk, 50);
});
