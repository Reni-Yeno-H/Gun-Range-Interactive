/*
    Gun Range Web Interactive
    Author: Hao Ren Yuan
    Date: March 6, 2023
    Filename: visual_layout.css
*/

/*
// Get references to the necessary DOM elements
const interactiveSection = document.getElementById('interactive-section');
const container = document.getElementById('container');
const target = document.getElementById('.target');
const counter = document.getElementById('.counter');

// Initialize hit counter
let hitCount = 0;

// Function to get a random position within the container
function getRandomPosition() {
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const x = Math.floor(Math.random() * (containerRect.width - targetRect.width));
  const y = Math.floor(Math.random() * (containerRect.height - targetRect.height));
  return { x, y };
}

// Function to clone a target and add event listener for it
function cloneTarget() {
  const clone = target.cloneNode();
  clone.style.top = target.style.top;
  clone.style.left = target.style.left;
  container.appendChild(clone);
  clone.addEventListener('click', onTargetClick);
}

// Function to handle click events on targets
function onTargetClick(event) {
  hitCount++;
  counter.innerText = `Hits: ${hitCount}`;
  event.target.remove();
  cloneTarget();
}

// Move the target within the container
function moveTarget() {
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  let x = parseInt(target.style.left) + 5;
  let y = parseInt(target.style.top);
  if (x + targetRect.width > containerRect.width || x < 0) {
    x = Math.max(0, Math.min(containerRect.width - targetRect.width, x));
  }
  if (y + targetRect.height > containerRect.height || y < 0) {
    y = Math.max(0, Math.min(containerRect.height - targetRect.height, y));
  }
  target.style.left = x + 'px';
  target.style.top = y + 'px';
}

// Start the animation loop
function animate() {
  moveTarget();
  requestAnimationFrame(animate);
}

// Initialize the animation loop
animate();

// Clone the target and add event listener for it
cloneTarget();
target.addEventListener('click', onTargetClick);

// Set the initial hit counter value
counter.innerText = `Hits: ${hitCount}`;

// Restrict the movement of the target within the interactive section
interactiveSection.addEventListener('mousemove', (event) => {
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const x = Math.max(containerRect.left, Math.min(containerRect.right - targetRect.width, event.clientX - targetRect.width / 2));
  const y = Math.max(containerRect.top, Math.min(containerRect.bottom - targetRect.height, event.clientY - targetRect.height / 2));
  target.style.left = x + 'px';
  target.style.top = y + 'px';
});

function getRandomPosition() {
    const interactiveSectionRect = interactiveSection.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const x = Math.floor(Math.random() * (interactiveSectionRect.width - targetRect.width));
    const y = Math.floor(Math.random() * (interactiveSectionRect.height - targetRect.height));
    return { x, y };
  }
  */

  let counter = 0;

  // Get interactive section element
  let interactiveSection = document.querySelector('.interactive-section');
  
  // Get target element
  let target = document.querySelector('.target');
  
  // Add click event listener to target element
  target.addEventListener('click', function(event) {
    if (event.target.classList.contains('target')) {
      // Increment counter
      counter++;
  
      // Update counter element
      let counterElement = document.querySelector('.counter');
      counterElement.textContent = counter;
  
      // Remove existing target
      target.remove();
  
      // Get random position within interactive section
      let randomX = getRandomPosition(interactiveSection.offsetWidth - target.offsetWidth - 20, 20);
      let randomY = getRandomPosition(interactiveSection.offsetHeight - target.offsetHeight - 20, 20);
  
      // Create clone of target element
      let targetClone = target.cloneNode(true);
  
      // Set position of clone
      targetClone.style.top = randomY + 'px';
      targetClone.style.left = randomX + 'px';
  
      // Add click event listener to clone
      targetClone.addEventListener('click', function(event) {
        if (event.target.classList.contains('target')) {
          // Remove clone
          this.remove();
  
          // Get random position within interactive section
          let randomX = getRandomPosition(interactiveSection.offsetWidth - target.offsetWidth - 20, 20);
          let randomY = getRandomPosition(interactiveSection.offsetHeight - target.offsetHeight - 20, 20);
  
          // Set position of new target
          target.style.top = randomY + 'px';
          target.style.left = randomX + 'px';
  
          // Add new target to interactive section
          interactiveSection.appendChild(target);
        }
      });
  
      // Add clone to interactive section
      interactiveSection.appendChild(targetClone);
    }
  });
  
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
