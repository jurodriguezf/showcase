let mountainHeights = [];

function setup() {
  createCanvas(400, 400);
  background(220);

  // Generate random mountain heights
  let numMountains = 10;
  for (let i = 0; i < numMountains; i++) {
    mountainHeights.push(random(height / 2));
  }
}

function draw() {
  let gap = 50

  // Sky
  stroke(0, 0, 0, 0);
  fill(155, 200, 215);
  rect(0, 0, height, height/2);

  // Mountain
  stroke(0, 0, 0, 0);
  fill(119, 152, 117);
  rect(0, 20, width, 400, 20, 20, 0, 0);

  // Ground
  stroke(0, 0, 0, 0);
  fill(64, 131, 85);
  rect(0, 200, 400, 400);

  // Railway
  stroke(0, 0, 0, 0);
  fill(81, 72, 60);
  // Trapezoid shape
  let x1 = 0;
  let y1 = height;
  let x2 = width;
  let y2 = height;
  let x3 = width/2 + gap;
  let y3 = height/2;
  let x4 = width/2 - gap;
  let y4 = height/2;
  beginShape();
  vertex(x1, y1);
  vertex(x2, y2);
  vertex(x3, y3);
  vertex(x4, y4);
  endShape(CLOSE);

  // Trees
  fill(88, 117, 86);
  noStroke();
  let mountainWidth = 40;
  let mountainHeight = 50;
  let mountainSpacing = width / (mountainHeights.length - 1);
  for (let i = 0; i < mountainHeights.length; i++) {
    let x = i * mountainSpacing;
    let y = y3 - mountainHeight - mountainHeights[i];
    triangle(x, y, x + mountainWidth/2, y + mountainHeight, x - mountainWidth/2, y + mountainHeight);
  }

  // Tunnel outline
  stroke(0, 0, 0, 0);
  fill(50, 50, 50);
  rect(width/2 - gap - 10, 200, 2*gap + 20, -110, 0, 0, 30, 30);

  // Tunnel
  stroke(0, 0, 0, 0);
  fill(30, 30, 30);
  rect(width/2 - gap, 200, 2*gap, -100, 0, 0, 30, 30);

  // Line
  stroke(0, 0, 0, 0);
  fill(180, 180, 180);
  // Trapezoid shape
  let tx1 = width/2 - 30;
  let ty1 = height;
  let tx2 = width/2 + 30;
  let ty2 = height;
  let tx3 = width/2+3;
  let ty3 = height/2;
  let tx4 = width/2-3;
  let ty4 = height/2;
  beginShape();
  vertex(tx1, ty1);
  vertex(tx2, ty2);
  vertex(tx3, ty3);
  vertex(tx4, ty4);
  endShape(CLOSE);
}