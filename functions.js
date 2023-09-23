"use strict";
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
glockImg.style.zIndex = '2';
let isImageChanged = false;

const uziImg = document.getElementById('uzi');

// target element
const target = document.getElementById('target');
// counter element
const counter = document.getElementById('counter');
// Get a reference to the speed counter element
const speedCounter = document.getElementById('speedCounter');


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
  target.style.zIndex = '1';
}

// initialize target
target.addEventListener('click', handleTargetClick);
spawnTarget();

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
  
  // Get random position within bounds
  function getRandomPosition(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }

let intervalId; // Declare a variable to hold the interval ID
let currentSpeed = 1000; // Initial speed (1 second)
// Update the speed counter with the initial speed
speedCounter.textContent = `Speed: ${currentSpeed} ms`;
let isFrozen = false; // Initial frozen state

const buttonContainer = document.querySelector('.button-container');

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

// Add click event listener to the "snailButton" button
var snail = document.getElementById('snailButton');
snail.addEventListener('click', function () {
    currentSpeed = 4000; // Change to a slower speed (4 seconds)
    const newSpeed = currentSpeed;
    setTargetInterval(newSpeed); // Set the new interval
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

// Add click event listener to the "marathonButton" button
var marathon = document.getElementById('marathonButton');
marathon.addEventListener('click', function () {
    currentSpeed = 500; // Change to a faster speed (1/2 seconds)
    const newSpeed = currentSpeed;
    setTargetInterval(newSpeed); // Set the new interval
    hideContainerAfterSetting();
});

// Function to increase the speed
function increaseSpeed() {
  currentSpeed /= 2; // Halve the current speed
  const newSpeed = currentSpeed;
  setTargetInterval(newSpeed); // Set the new interval
  //hideContainerAfterSetting();
}

// Add click event listener to the "increaseSpeed" button
var increaseSpeedButton = document.getElementById('increaseSpeed');
increaseSpeedButton.addEventListener('click', increaseSpeed);

// Function to decrease the speed
function decreaseSpeed() {
  currentSpeed *= 2; // Double the current speed
  const newSpeed = currentSpeed;
  setTargetInterval(newSpeed); // Set the new interval
  //hideContainerAfterSetting();
}

// Add click event listener to the "decreaseSpeed" button
var decreaseSpeedButton = document.getElementById('decreaseSpeed');
decreaseSpeedButton.addEventListener('click', decreaseSpeed);

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

// Add click event listener to the "Freeze" button
var freezeButton = document.getElementById('freezeButton/unfreezeButton');
freezeButton.addEventListener('click', toggleFreeze);

// Initial setup
setTargetInterval(currentSpeed);
  
  // Get references to the button and container elements
  const toggleButton = document.querySelector('.toggle-difficulty');
  //const buttonContainer = document.querySelector('.button-container'); //Must be moved up(done) because things on top inherits this

  // Function to hide the button container
  function hideContainerAfterSetting() {
    buttonContainer.style.display = 'none';
  }

  // Function to hide the button container when an element with class "interactive-section" is clicked
  function hideButtonContainer() {
    var x = document.getElementById("toggle-difficulty");
      x.style.display = "none";
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
  const rect = interactiveSection.getBoundingClientRect();
  const x = event.clientX - rect.left - 240; // Adjust the subtraction value as desired, higher means gun go left, lower means gun go right
  const y = event.clientY - rect.top - 25; // Adjust the subtraction value as desired, higher means up, lower means go down
  glockImg.style.left = `${x}px`;
  glockImg.style.top = `${y}px`;
});

// Below controls whether or not gun follow cursor after pressing gun slider

let isGlockActive = true;
let currentIndex = 0;

const nextButton = document.getElementsByClassName('btn btn-next');
const prevButton = document.getElementsByClassName('btn btn-prev');

nextButton.addEventListener('click', function() {
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

prevButton.addEventListener('click', function() {
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
