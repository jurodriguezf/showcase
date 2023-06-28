function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  stroke(180);
  strokeWeight(6);
  
  // Gray grid drawing
  for (let x = 25; x <= width - 25; x += 50) {
    for (let y = 25; y <= height - 25; y += 50) {
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }

  // White discs
  noStroke();
  fill(255);
  for (let x = 25; x <= width - 25; x += 50) {
    for (let y = 25; y <= height - 25; y += 50) {
      ellipse(x, y, 10, 10);
    }
  }
}