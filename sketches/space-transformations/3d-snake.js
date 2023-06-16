const CELL_SIZE = 25;
const CELLS_PER_AXIS = 11;
const ARENA_SIZE = CELL_SIZE * CELLS_PER_AXIS;
const HALF_ARENA_SIZE = ARENA_SIZE/2;
const MOVE_DELAY = 700;
const SHIFT_ACCELERATION = 3;

let playerPositionVector;
let playerDirectionVector;

let foodPositionVector;

let playerScore = 0;

let keyMapping;
let nextMoveTime;

var easycam;

// Load font
function preload() {
  font = loadFont("https://cdnjs.cloudflare.com/ajax/libs/bwip-js/2.0.6/Inconsolata.otf");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  
  easycam = createEasyCam();
  easycam.setState({  
      distance: 437, 
      center:   [0, 0, 0],
      rotation: [0.92, -0.09, 0.38, -0.03]
    }
  );

  // Position and direction vector initialization
  playerPositionVector = createVector(0, 0, 0);
  playerDirectionVector = createVector(0, 0, 0);
  
  // Food position vector
  const randomFoodX = Math.floor(random(-HALF_ARENA_SIZE, HALF_ARENA_SIZE) / CELL_SIZE) * CELL_SIZE;
  const randomFoodY = Math.floor(random(-HALF_ARENA_SIZE, HALF_ARENA_SIZE) / CELL_SIZE) * CELL_SIZE;
  const randomFoodZ = Math.floor(random(-HALF_ARENA_SIZE, HALF_ARENA_SIZE) / CELL_SIZE) * CELL_SIZE;
  foodPositionVector = createVector(randomFoodX, randomFoodY, randomFoodZ);
  
  // Move time initialization
  nextMoveTime = millis();

  // Keyboard keys direction vector mapping
  keyMapping = {
    'ArrowRight': createVector( 1, 0, 0),
    'ArrowLeft': createVector(-1, 0, 0),
    'ArrowUp': createVector(0, -1, 0),
    'ArrowDown': createVector(0, 1, 0),
    'w': createVector(0, 0, -1),
    's': createVector(0, 0, 1),
    'p': createVector(0, 0, 0),
  };
  
  // Font setup
  textFont(font);
  textAlign(LEFT);
}

function draw() {
  delayMovement();
  
  background(255);

  drawHud();
  drawArena();
  
  drawCube();
  drawFood();
}

// Delay cube movement
function delayMovement() {
  if (millis() > nextMoveTime) {
    // Calculate the next position
    const nextPosition = p5.Vector.add(playerPositionVector, p5.Vector.mult(playerDirectionVector, CELL_SIZE));
    
    // Check if the next position is outside the arena
    const halfCellSize = CELL_SIZE / 2;
    if (
      abs(nextPosition.x) > HALF_ARENA_SIZE - halfCellSize ||
      abs(nextPosition.y) > HALF_ARENA_SIZE - halfCellSize ||
      abs(nextPosition.z) > HALF_ARENA_SIZE - halfCellSize
    ) {
      teleportToCenter();
    } else {
      playerPositionVector = nextPosition;
    }
    
    // Check for player collission with food
    if (playerPositionVector.equals(foodPositionVector)) {
      randomizeFoodPosition();
      playerScore++;
    }
    
    nextMoveTime += keyIsDown(SHIFT) ? MOVE_DELAY / SHIFT_ACCELERATION : MOVE_DELAY;
  }
}

// Draw arena
function drawArena() {
  stroke('gray');

  const xyPlaneZ = -HALF_ARENA_SIZE;
  const zxPlaneY = HALF_ARENA_SIZE;
  const zyPlaneX = HALF_ARENA_SIZE;

  // Draw planes
  for (let i = -HALF_ARENA_SIZE; i <= HALF_ARENA_SIZE; i += CELL_SIZE) {
    // XY plane
    line(-HALF_ARENA_SIZE, i, xyPlaneZ, HALF_ARENA_SIZE, i, xyPlaneZ);
    line(i, -HALF_ARENA_SIZE, xyPlaneZ, i, HALF_ARENA_SIZE, xyPlaneZ);
    // ZX plane
    line(-HALF_ARENA_SIZE, zxPlaneY, i, HALF_ARENA_SIZE, zxPlaneY, i);
    line(i, zxPlaneY, -HALF_ARENA_SIZE, i, zxPlaneY, HALF_ARENA_SIZE);
    // ZY plane
    line(zyPlaneX, -HALF_ARENA_SIZE, i, zyPlaneX, HALF_ARENA_SIZE, i);
    line(zyPlaneX, i, -HALF_ARENA_SIZE, zyPlaneX, i, HALF_ARENA_SIZE);
  }
}

// Cube rendering
function drawCube() {
  push();
  translate(...playerPositionVector.array());
  fill(0, 0, 0, 100);
  box(CELL_SIZE);
  pop();
  
  drawProjections(playerPositionVector);
}

// Food rendering
function drawFood() {
  push();
  translate(...foodPositionVector.array());
  fill(255, 0, 0, 100);
  box(CELL_SIZE);
  pop();
  
  drawProjections(foodPositionVector);
}

// Draw the projections in each plane of a given vector
function drawProjections(positionVector) {
  push();
  translate(...positionVector.array());

  const xyPlaneZ = -HALF_ARENA_SIZE;
  const zxPlaneY = HALF_ARENA_SIZE;
  const zyPlaneX = HALF_ARENA_SIZE;

  // Draw lines from cube to each plane
  stroke(0, 0, 255); // Blue (XY plane projection)
  let xyLineLength = abs(positionVector.z - xyPlaneZ);
  line(0, 0, 0, 0, 0, -xyLineLength);

  stroke(0, 255, 0); // Green (ZX plane projection)
  let zxLineLength = abs(positionVector.y - zxPlaneY);
  line(0, 0, 0, 0, zxLineLength, 0);

  stroke(255, 0, 0); // Red (ZY plane projection)
  let zyLineLength = abs(positionVector.x - zyPlaneX);
  line(zyLineLength, 0, 0, 0, 0, 0);
  
  pop();

  // XY plane projection
  push();
  translate(0, 0, -HALF_ARENA_SIZE);
  fill(0, 0, 255); // Blue
  rectMode(CENTER);
  rect(positionVector.x, positionVector.y, CELL_SIZE*0.6, CELL_SIZE*0.6);
  pop();

  // ZX plane projection
  push();
  translate(0, HALF_ARENA_SIZE, positionVector.z);
  fill(0, 255, 0); // Green
  rectMode(CENTER);
  rotateX(HALF_PI);
  rect(positionVector.x, 0, CELL_SIZE*0.6, CELL_SIZE*0.6);
  pop();

  // ZY plane projection
  push();
  translate(HALF_ARENA_SIZE, positionVector.y, positionVector.z);
  fill(255, 0, 0); // Red
  rectMode(CENTER);
  rotateY(HALF_PI);
  rect(0, 0, CELL_SIZE*0.6, CELL_SIZE*0.6);
  pop();
}

// Teleport the player to the center of the arena and reset score
function teleportToCenter() {
  playerPositionVector.set(0, 0, 0);
  playerScore = 0;
}

// HUD drawing
function drawHud() {
  textSize(20);
  
  easycam.beginHUD();
  push();
  translate(490, 20);
  fill(0, 0, 0);
  text("Score: " + playerScore, 0, 0);
  pop();

  push();
  translate(20, 20);
  fill(192, 0, 0);
  text("<- and -> keys: X direction", 0, 0);

  translate(0, 20);
  fill(0, 192, 0);
  text("↑ and ↓ keys: Y direction", 0, 0);

  translate(0, 20);
  fill(0, 0, 192);
  text("'w' and 's' keys: Z direction", 0, 0);
  
  translate(0, 20);
  fill(0, 0, 0);
  text("'shift' key: accelerate", 0, 0);
  pop();

  easycam.endHUD();
}

// Randomize food position
function randomizeFoodPosition() {
  let validPosition = false;

  while (!validPosition) {
    const randomX = Math.floor(random(-HALF_ARENA_SIZE, HALF_ARENA_SIZE + 1) / CELL_SIZE) * CELL_SIZE;
    const randomY = Math.floor(random(-HALF_ARENA_SIZE, HALF_ARENA_SIZE + 1) / CELL_SIZE) * CELL_SIZE;
    const randomZ = Math.floor(random(-HALF_ARENA_SIZE, HALF_ARENA_SIZE + 1) / CELL_SIZE) * CELL_SIZE;

    foodPositionVector.set(randomX, randomY, randomZ);

    // Check if the generated position is within the arena
    if (
      abs(randomX) <= HALF_ARENA_SIZE &&
      abs(randomY) <= HALF_ARENA_SIZE &&
      abs(randomZ) <= HALF_ARENA_SIZE
    ) {
      validPosition = true;
    }
  }
}

// Key press events
function keyPressed() {
  const pressedKey = keyMapping[key];
  // Change direction vector when key is pressed
  if (pressedKey) playerDirectionVector = pressedKey;
  //if (key == "d")console.log(easycam.getState())
  if (key === 'r') randomizeFoodPosition();
}