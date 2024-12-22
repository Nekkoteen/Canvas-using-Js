// Get references to HTML elements
const canvas = document.getElementById('signature-canvas');
const bgColorPicker = document.getElementById('bg-color');
const penColorPicker = document.getElementById('pen-color');
const penSizeSlider = document.getElementById('pen-size');
const clearButton = document.getElementById('clear');
const saveButton = document.getElementById('save');

// Set up canvas dimensions
canvas.width = window.innerWidth * 0.8; // 80% of the screen width
canvas.height = 400;

// Get canvas context for drawing
const ctx = canvas.getContext('2d');
// Get a random color of bg
function getRandomColor() {
    // Generate a random number for the color
    const randomNumber = Math.floor(Math.random() * 16777215); // Generate a random number
    const randomColor = "#" + randomNumber.toString(16); // Convert it to a hex color
    document.body.style.backgroundColor = randomColor; // Apply the random color
}

// Initialize drawing settings
let isDrawing = false; // Tracks whether the user is drawing
let penColor = penColorPicker.value; // Initial pen color
let penSize = penSizeSlider.value; // Initial pen size

// Helper function to update pen color
penColorPicker.addEventListener('input', (event) => {
  penColor = event.target.value;
});

// Helper function to update pen size
penSizeSlider.addEventListener('input', (event) => {
  penSize = event.target.value;
});

// Helper function to update canvas background color
bgColorPicker.addEventListener('input', (event) => {
  canvas.style.backgroundColor = event.target.value;
});

// Start drawing when the mouse is pressed
canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  ctx.beginPath(); // Start a new path
  ctx.moveTo(event.offsetX, event.offsetY); // Move to the starting point
});

// Draw on the canvas as the mouse moves
canvas.addEventListener('mousemove', (event) => {
  if (isDrawing) {
    ctx.strokeStyle = penColor; // Set pen color
    ctx.lineWidth = penSize; // Set pen size
    ctx.lineCap = 'round'; // Smooth edges
    ctx.lineTo(event.offsetX, event.offsetY); // Draw a line to this point
    ctx.stroke(); // Draw the line
  }
});

// Stop drawing when the mouse is released
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx.closePath(); // Finish the path
});

// Clear the canvas
clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  getRandomColor();
});

// Save the canvas as an image
saveButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'canvas.png'; // File name
  link.href = canvas.toDataURL(); // Convert canvas to image
  link.click(); // Trigger the download
});

