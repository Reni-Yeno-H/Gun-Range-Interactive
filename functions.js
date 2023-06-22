/*
    Gun Range Web Interactive
    Author: Hao Ren Yuan
    Date: March 6, 2023
    Filename: functions.js
*/

// interactive section element
const interactiveSection = document.querySelector('.interactive-section');

// glockImg element
const glockImg = document.getElementById('glock');
let isImageChanged = false;

// target element
const target = document.getElementById('target');

// counter element
const counter = document.getElementById('counter');


// target click handler
function handleTargetClick(e) {
  e.stopPropagation();
  e.preventDefault();
  target.style.display = 'none';
  counter.innerText = parseInt(counter.innerText) + 1;
  spawnTarget();
}

// spawn target function
function spawnTarget() {
  const sectionWidth = interactiveSection.offsetWidth;
  const sectionHeight = interactiveSection.offsetHeight;
  const targetWidth = target.offsetWidth;
  const targetHeight = target.offsetHeight;
  const maxX = sectionWidth - targetWidth;
  const maxY = sectionHeight - targetHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  target.style.top = randomY + 'px';
  target.style.left = randomX + 'px';
  target.style.display = 'block';
}

// initialize target
target.addEventListener('click', handleTargetClick);
spawnTarget();

  // Move target randomly within interactive section
  function moveTarget() {
    let randomX = getRandomPosition(interactiveSection.offsetWidth - target.offsetWidth - 20, 20);
    let randomY = getRandomPosition(interactiveSection.offsetHeight - target.offsetHeight - 20, 20);
  
    // Check if target is touching border
    if (randomX < 0 || randomX + target.offsetWidth > interactiveSection.offsetWidth || randomY < 0 || randomY + target.offsetHeight > interactiveSection.offsetHeight) {
      // Teleport target to center of interactive section
      randomX = (interactiveSection.offsetWidth - target.offsetWidth) / 2;
      randomY = (interactiveSection.offsetHeight - target.offsetHeight) / 2;
    }
  
    target.style.top = randomY + 'px';
    target.style.left = randomX + 'px';
  }
  
  // Get random position within bounds
  function getRandomPosition(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  // Move target every 2 seconds
  setInterval(moveTarget, 500);

  // Change weapon image into firing image when left clicked
  interactiveSection.addEventListener('click', function(event) {
    // Check if the left mouse button is clicked
    if (event.button === 0) {
      if (isImageChanged) {
        glockImg.src = 'Assets/Glock.png';
      } else {
        glockImg.src = 'Assets/Glock_Shot.png'; // Replace with the path to the new image
      }
    
      isImageChanged = !isImageChanged;
      // Revert back to the original image after 2 seconds (adjust the delay as needed)
      setTimeout(function() {
      glockImg.src = 'Assets/Glock.png';
      isImageChanged = false;
    }, 50);
    }
  });
