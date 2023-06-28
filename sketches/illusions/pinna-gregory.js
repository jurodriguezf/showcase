function setup() {
    createCanvas(400, 400);
    noFill();
    strokeWeight(2);
  }
  
  function draw() {
    background(180);
    translate(width / 2, height / 2);
  
    for (let i = 1; i < 8; i++) { // Loops starts at 1
      const angle = i * 27; // Angle multiplier must be odd
      const rotation = (angle % 2 === 0) ? -1 : 1;
      drawPinna(angle, rotation);
    }
  }
  
  function drawPinna(angle, rotation) {
    const n = Math.floor(angle / 2) + 1;
    const d = 5;
  
    for (let i = 0; i < n; i++) {
      const theta = (TWO_PI / n) * i;
      const x = angle * sin(theta);
      const y = angle * cos(theta);
      const fillColor = (i % 2 === 0) ? 255 : 0;
  
      push();
      rotate(rotation * PI / 15);
      stroke(fillColor);
      rect(x, y, 7, 7);
      pop();
    }
  }
  