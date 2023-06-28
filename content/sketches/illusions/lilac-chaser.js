let dotSize = 45;
let gapSize = 150;
let dotCount = 12;
let dotColor;
let currentDot = 0;
let fadeDelay = 100; // milliseconds

function setup() {
  createCanvas(400, 400);
  dotColor = color(200, 20, 255);
  dotColor.setAlpha(100);
  noStroke();
}

function draw() {
  background(220);
  translate(width / 2, height / 2);

  // Elapsed time in milliseconds, allows to create a repeating pattern for the fading effect
  let elapsed = millis() % (fadeDelay * dotCount);

  // Index of the currently fading dot
  let dotIndex = Math.floor(elapsed / fadeDelay);

  // Circles drawing
  for (let i = 0; i < dotCount; i++) {
    let alpha = i === dotIndex ? 0 : 100;
    let angle = i * 360 / dotCount;
    let x = gapSize * cos(radians(angle));
    let y = gapSize * sin(radians(angle));
    fill(dotColor.levels[0], dotColor.levels[1], dotColor.levels[2], alpha);
    ellipse(x, y, dotSize, dotSize);
  }
  
  // Blur
  drawingContext.filter = 'blur(12px)';

  // Disable the blur effect temporarily
  drawingContext.filter = 'none';
  // Draw the central cross
  fill(0);
  rectMode(CENTER);
  rect(0, 0, 3, 25);
  rect(0, 0, 25, 3);
  
  drawingContext.filter = 'blur(12px)';
}
