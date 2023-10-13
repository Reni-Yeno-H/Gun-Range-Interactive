"use strict";
/*
    Gun Range Web Interactive
    Author: Hao Ren Yuan
    Date: March 6, 2023
    Filename: functions.js
*/

//  Marking the event handler as "passive" to make the page more responsive and avoid potential performance problems.
const touchTarget = document.getElementById('touchTarget');

touchTarget.addEventListener('touchstart', function(event) {

}, { passive: true });

// interactive section element
const interactiveSection = document.querySelector('.interactive-section');
const interactiveSection1 = document.querySelector('.interactive-section');

// glockImg element
const glockImg = document.getElementById('glock');
glockImg.style.zIndex = '2';
let isImageChanged = false;

const uziImg = document.getElementById('uzi');

// target element
const target = document.getElementById('target');
const target1 = document.getElementById('target1');
// counter element
const scoreCounter = document.getElementById('counter');
const settingScoreCounter = document.getElementById('scoreCounter');
let settingScoreCount = 0;
// counter element
const deathsCounter = document.getElementById('deathsCounter');
let deathsCount = 0;
// Get a reference to the speed counter element
const speedCounter = document.getElementById('speedCounter');
const speedCounter1 = document.getElementById('speedCounter1');


// target click handler
function handleTargetClick(e) {
  e.stopPropagation();
  e.preventDefault();
  target.style.display = 'none';
  scoreCounter.innerText = parseInt(scoreCounter.innerText) + 1;

  settingScoreCount++;
  settingScoreCounter.textContent = `${settingScoreCount}`;
  spawnTarget();
}

// target click handler
function handleTargetClick1(e) {
  e.stopPropagation();
  e.preventDefault();
  target1.style.display = 'none';
  //deathCounter.innerText = parseInt(deathCounter.innerText) + 1;
  deathsCount++;
  deathsCounter.textContent = `${deathsCount}`;
  spawnTarget1();
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
  target.style.zIndex = '1';
}

function spawnTarget1() {
  const sectionWidth = interactiveSection1.offsetWidth;
  const sectionHeight = interactiveSection1.offsetHeight;
  const targetWidth = target1.offsetWidth;
  const targetHeight = target1.offsetHeight;
  const maxX = sectionWidth - targetWidth;
  const maxY = sectionHeight - targetHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  target1.style.top = randomY + 'px';
  target1.style.left = randomX + 'px';
  target1.style.display = 'block';
  target1.style.zIndex = '1';
}

//Shot Animation Frame Change when target is clicked
target.addEventListener('click', function(event) {
  // Check if the left mouse button is clicked
  if (event.button === 0) {
    if (isImageChanged) {
      glockImg.src = 'Assets/Glock.png';
    } else {
      glockImg.src = 'Assets/Glock_Shot.png'; // Replace with the path to the new image
      target.addEventListener('click', handleTargetClick);
    }

    isImageChanged = !isImageChanged;
    
    // Revert back to the original image after 2 seconds (adjust the delay as needed)
    setTimeout(function() {
      glockImg.src = 'Assets/Glock.png';
      isImageChanged = false;
    }, 100); // Change the delay to 2000 milliseconds (1/10 seconds)
  }
});

//Shot Animation Frame Change when civilian is clicked
target1.addEventListener('click', function(event) {
  // Check if the left mouse button is clicked
  if (event.button === 0) {
    if (isImageChanged) {
      glockImg.src = 'Assets/Glock.png';
    } else {
      glockImg.src = 'Assets/Glock_Shot.png'; // Replace with the path to the new image
      target.addEventListener('click', handleTargetClick);
    }

    isImageChanged = !isImageChanged;
    
    // Revert back to the original image after 2 seconds (adjust the delay as needed)
    setTimeout(function() {
      glockImg.src = 'Assets/Glock.png';
      isImageChanged = false;
    }, 100); // Change the delay to 2000 milliseconds (1/10 seconds)
  }
});

// initialize target
//target.addEventListener('click', handleTargetClick);
spawnTarget();
target1.addEventListener('click', handleTargetClick1);
spawnTarget1();
  // Move target randomly within interactive section
  function moveTarget() {
    let randomX = getRandomPosition(interactiveSection.offsetWidth - target.offsetWidth - 20, -20); // max left ,min right to ensure it won't touch out of bounds
    let randomY = getRandomPosition(interactiveSection.offsetHeight - target.offsetHeight - 20, 20); // max top,min botttom to ensure it won't touch out of bounds
  
    // Check if target is touching border
    if (randomX < 0 || randomX + target.offsetWidth > interactiveSection.offsetWidth || randomY < 0 || randomY + target.offsetHeight > interactiveSection.offsetHeight) {
      // Teleport target to center of interactive section
      randomX = (interactiveSection.offsetWidth - target.offsetWidth) / 2;
      randomY = (interactiveSection.offsetHeight - target.offsetHeight) / 2;
    }
  
    target.style.top = randomY + 'px';
    target.style.left = randomX + 'px';
  }

  function moveTarget1() {
    let randomX = getRandomPosition(interactiveSection1.offsetWidth - target1.offsetWidth - 20, -20); // max left ,min right to ensure it won't touch out of bounds
    let randomY = getRandomPosition(interactiveSection1.offsetHeight - target1.offsetHeight - 20, 20); // max top,min botttom to ensure it won't touch out of bounds
  
    // Check if target is touching border
    if (randomX < 0 || randomX + target1.offsetWidth > interactiveSection1.offsetWidth || randomY < 0 || randomY + target1.offsetHeight > interactiveSection.offsetHeight) {
      // Teleport target to center of interactive section
      randomX = (interactiveSection1.offsetWidth - target1.offsetWidth) / 2;
      randomY = (interactiveSection1.offsetHeight - target1.offsetHeight) / 2;
    }
  
    target1.style.top = randomY + 'px';
    target1.style.left = randomX + 'px';
  }
  
  // Get random position within bounds
  function getRandomPosition(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }

let intervalId; // Declare a variable to hold the interval ID
let intervalId1; // Declare a variable to hold the interval ID
let currentSpeed = 1000; // Initial speed (1 second)
let currentSpeed1 = 1000; // Initial speed (1 second)

// Update the speed counter with the initial speed
speedCounter.textContent = `Speed: ${currentSpeed} ms`;
speedCounter1.textContent = `Speed: ${currentSpeed1} ms`;
let isFrozen = false; // Initial frozen state
let isON = true; //This is set as true but is clicked false manually.

const buttonContainer = document.querySelector('.button-container');
const buttonContainer1 = document.querySelector('.button-container1');

// Function to set the interval with the current speed
function setTargetInterval(newSpeed) {
    currentSpeed = newSpeed;
    speedCounter.textContent = `Speed: ${currentSpeed} ms`;
    clearInterval(intervalId); // Clear any existing interval
    if (!isFrozen) {
      intervalId = setInterval(moveTarget, currentSpeed); // Set the interval with the current speed
  }
    //intervalId = setInterval(moveTarget, currentSpeed); // Set the interval with the current speed
    hideContainerAfterSetting();
}

function setTargetInterval1(newSpeed) {
  currentSpeed1 = newSpeed;
  speedCounter1.textContent = `Speed: ${currentSpeed1} ms`;
  clearInterval(intervalId1); // Clear any existing interval
  if (!isFrozen) {
    intervalId1 = setInterval(moveTarget1, currentSpeed1); // Set the interval with the current speed
}
  //intervalId = setInterval(moveTarget, currentSpeed); // Set the interval with the current speed
  hideContainerAfterSetting();
}

// Add click event listener to the "snailButton" button
var snail = document.getElementById('snailButton');
snail.addEventListener('click', function () {
    currentSpeed = 4000; // Change to a slower speed (4 seconds)
    const newSpeed = currentSpeed;
    setTargetInterval(newSpeed); // Set the new interval
    hideContainerAfterSetting();
});

var snail1 = document.getElementById('snailButton1');
snail1.addEventListener('click', function () {
    currentSpeed1 = 4000; // Change to a slower speed (4 seconds)
    const newSpeed = currentSpeed1;
    setTargetInterval1(newSpeed); // Set the new interval
    hideContainerAfterSetting();
});

// Add click event listener to the "normalButton" button
var normal = document.getElementById('normalButton');
normal.addEventListener('click', function () {
    currentSpeed = 1000; // Change to a slower speed (4 seconds)
    const newSpeed = currentSpeed;
    setTargetInterval(newSpeed); // Set the new interval
    hideContainerAfterSetting();
});

var normal1 = document.getElementById('normalButton1');
normal1.addEventListener('click', function () {
    currentSpeed1 = 1000; // Change to a slower speed (4 seconds)
    const newSpeed = currentSpeed1;
    setTargetInterval1(newSpeed); // Set the new interval
    hideContainerAfterSetting();
});

// Add click event listener to the "marathonButton" button
var marathon = document.getElementById('marathonButton');
marathon.addEventListener('click', function () {
    currentSpeed = 500; // Change to a faster speed (1/2 seconds)
    const newSpeed = currentSpeed;
    setTargetInterval(newSpeed); // Set the new interval
    hideContainerAfterSetting();
});

var marathon1 = document.getElementById('marathonButton1');
marathon1.addEventListener('click', function () {
    currentSpeed1 = 500; // Change to a faster speed (1/2 seconds)
    const newSpeed = currentSpeed1;
    setTargetInterval1(newSpeed); // Set the new interval
    hideContainerAfterSetting();
});

// Function to increase the speed
function increaseSpeed() {
  currentSpeed /= 2; // Halve the current speed
  const newSpeed = currentSpeed;
  setTargetInterval(newSpeed); // Set the new interval
  //hideContainerAfterSetting();
}

function increaseSpeed1() {
  currentSpeed1 /= 2; // Halve the current speed
  const newSpeed = currentSpeed1;
  setTargetInterval1(newSpeed); // Set the new interval
  //hideContainerAfterSetting();
}

// Add click event listener to the "increaseSpeed" button
var increaseSpeedButton = document.getElementById('increaseSpeed');
increaseSpeedButton.addEventListener('click', increaseSpeed);

var increaseSpeedButton1 = document.getElementById('increaseSpeed1');
increaseSpeedButton1.addEventListener('click', increaseSpeed1);

// Function to decrease the speed
function decreaseSpeed() {
  currentSpeed *= 2; // Double the current speed
  const newSpeed = currentSpeed;
  setTargetInterval(newSpeed); // Set the new interval
  //hideContainerAfterSetting();
}

function decreaseSpeed1() {
  currentSpeed1 *= 2; // Double the current speed
  const newSpeed = currentSpeed1;
  setTargetInterval1(newSpeed); // Set the new interval
  //hideContainerAfterSetting();
}

// Add click event listener to the "decreaseSpeed" button
var decreaseSpeedButton = document.getElementById('decreaseSpeed');
decreaseSpeedButton.addEventListener('click', decreaseSpeed);

var decreaseSpeedButton1 = document.getElementById('decreaseSpeed1');
decreaseSpeedButton1.addEventListener('click', decreaseSpeed1);

function toggleFreeze() {
  isFrozen = !isFrozen; // Toggle the state
  if (isFrozen) {
    clearInterval(intervalId); // Clear the interval to freeze the target
    speedCounter.textContent = 'Speed: Frozen';
  } else {
    // Resume target movement with the current speed
    intervalId = setInterval(moveTarget, currentSpeed);
    speedCounter.textContent = `Speed: ${currentSpeed} ms`;
  }
}

function toggleFreeze1() {
  isFrozen = !isFrozen; // Toggle the state
  if (isFrozen) {
    clearInterval(intervalId1); // Clear the interval to freeze the target
    speedCounter1.textContent = 'Speed: Frozen';
  } else {
    // Resume target movement with the current speed
    intervalId1 = setInterval(moveTarget1, currentSpeed1);
    speedCounter1.textContent = `Speed: ${currentSpeed1} ms`;
  }
}

function toggleOFF_ON() {
  isON = !isON; // Toggle the state
  if (isON) { //Allow civilian to appear
    target1.style.display = 'block';
  } else {
    // Hide civilian
    target1.style.display = 'none';
  }
}

// Add click event listener to the "Freeze" button
var freezeButton = document.getElementById('freezeButton/unfreezeButton');
freezeButton.addEventListener('click', toggleFreeze);

var freezeButton1 = document.getElementById('freezeButton/unfreezeButton1');
freezeButton1.addEventListener('click', toggleFreeze1);

// Add click event listener to the "OFF/ON" button
var off_onButton = document.getElementById('offButton/onButton');
off_onButton.addEventListener('click', toggleOFF_ON);

// Manually trigger a click event on the button
off_onButton.click();

// Initial setup
setTargetInterval(currentSpeed);
setTargetInterval1(currentSpeed1);
  
  // Get references to the button and container elements
  const toggleButton = document.querySelector('.toggle-difficulty');
  const toggleButton1 = document.querySelector('.civilian-difficulty');

  //const buttonContainer = document.querySelector('.button-container'); //Must be moved up(done) because things on top inherits this

  // Function to hide the button container
  function hideContainerAfterSetting() {
    buttonContainer.style.display = 'none';
    buttonContainer1.style.display = 'none';
  }

  // Function to hide the button container when an element with class "interactive-section" is clicked
  function hideButtonContainer() {
    var x = document.getElementById("toggle-difficulty");
      x.style.display = "none";

    var y = document.getElementById("civilian-difficulty");
      y.style.display = "none";
  }

  // Add click event listeners to all elements with class "interactive-section"
  var interactive_section = document.querySelectorAll('.container');
  interactive_section.forEach(function (interactive_section) {
    interactive_section.addEventListener('click', hideButtonContainer);
  });

  // Add a click event listener to the toggle button
  toggleButton.addEventListener('click', function () {
    if (buttonContainer.style.display === 'none' || buttonContainer.style.display === '') {
        buttonContainer.style.display = 'flex';
    } else {
        buttonContainer.style.display = 'none';
    }
  });

    // Add a click event listener to the toggle button
  toggleButton1.addEventListener('click', function () {
    if (buttonContainer1.style.display === 'none' || buttonContainer1.style.display === '') {
        buttonContainer1.style.display = 'flex';
    } else {
        buttonContainer1.style.display = 'none';
    }
  });

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
      // Revert back to the original image after 0.05 seconds (adjust the delay as needed) Ratio: 1000 = 1 second
      setTimeout(function() {
      glockImg.src = 'Assets/Glock.png';
      isImageChanged = false;
    }, 50);
    }
  });

//Below is for gun carousel slider selection

// Select all container
const containers = document.querySelectorAll(".container");

// loop through container and set each containers translateX
containers.forEach((container, indx) => {
  container.style.transform = `translateX(${indx * 100}%)`;
});

// select next container button
const nextContainer = document.querySelector(".btn-next");

// current container counter
let curContainer = 0;
// maximum number of containers
let maxContainer = containers.length - 1;

// add event listener and navigation functionality
nextContainer.addEventListener("click", function () {
  // check if current container is the last and reset current container
  if (curContainer === maxContainer) {
    curContainer = 0;
  } else {
    curContainer++;
  }

  //   move container by -100%
  containers.forEach((container, indx) => {
    container.style.transform = `translateX(${100 * (indx - curContainer)}%)`;
  });
});

// select next container button
const prevContainer = document.querySelector(".btn-prev");

// add event listener and navigation functionality
prevContainer.addEventListener("click", function () {
  // check if current container is the first and reset current container to last
  if (curContainer === 0) {
    curContainer = maxContainer;
  } else {
    curContainer--;
  }

  //   move container by 100%
  containers.forEach((container, indx) => {
    container.style.transform = `translateX(${100 * (indx - curContainer)}%)`;
  });
});

// Below allows gun to follow cursor

interactiveSection.addEventListener('mousemove', function(event) {
  const mouseX = event.clientX - interactiveSection.getBoundingClientRect();
  const rect = interactiveSection.getBoundingClientRect();
  let x = event.clientX - rect.right; // Adjust the subtraction value as desired, higher means gun go left, lower means gun go right
  let y = event.clientY - rect.top; // Adjust the subtraction value as desired, higher means up, lower means go down
  if(x < 200) { //left side
    flipImageHorizontally(glockImg);
    x = event.clientX - rect.right + 920; // Adjust the subtraction value as desired, higher means gun go left, lower means gun go right

  } 
  if (x > 200) {
    restoreOriginalImage(glockImg);
    x = event.clientX - rect.left - 240; // Adjust the subtraction value as desired, higher means gun go left, lower means gun go right

  }

  glockImg.style.left = `${x}px`;
  glockImg.style.top = `${y}px`;
});

function flipImageHorizontally(imgElement) {
  // Flip the image horizontally
  imgElement.style.transform = 'scaleX(-1)';
}

function restoreOriginalImage(imgElement) {
  // Restore the original image
  imgElement.style.transform = 'scaleX(1)';
}

// Below controls whether or not gun follow cursor after pressing gun slider

let isGlockActive = true;
let currentIndex = 0;

const nextButtons = document.getElementsByClassName('btn btn-next');
const prevButtons = document.getElementsByClassName('btn btn-prev');

for (let i = 0; i < nextButtons.length; i++) {
  nextButtons[i].addEventListener('click', function() {
    if (isGlockActive) {
      glockImg.style.display = 'none';
      uziImg.style.display = 'block';
      isGlockActive = false;
    } else {
      glockImg.style.display = 'block';
      uziImg.style.display = 'none';
      isGlockActive = true;
    }
  });
}

for (let i = 0; i < prevButtons.length; i++) {
  prevButtons[i].addEventListener('click', function() {
    if (isGlockActive) {
      glockImg.style.display = 'none';
      uziImg.style.display = 'block';
      isGlockActive = false;
    } else {
      glockImg.style.display = 'block';
      uziImg.style.display = 'none';
      isGlockActive = true;
    }
  });
}

  // Move target every 2 seconds
  setInterval(moveTarget, 500);

