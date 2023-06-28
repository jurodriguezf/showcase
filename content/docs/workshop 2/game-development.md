---
title: Game Development
type: docs
---

# **3D Snake Game**

# **Introduction**

In the realm of web development, *p5.js* has gained significant popularity for its simplicity and versatility in creating interactive graphics and animations. The ability to represent three-dimensional (3D) objects and environments opens up a new dimension of possibilities for learning. In this article, the topic of dynamic environments will be explored by implementing a three-dimensional interactive game using the *p5.js* library. The focus of this study is to develop a game environment in which a player-controlled cube moves within a cubic arena, collecting randomly generated food items while avoiding obstacles and trying to score as many points as possible.

This workshop focuses on 4 main aspects, but the main focus lies in **space transformations**:

1. **Interactive 3D Graphics:** This is demonstrated by the use of 3D rendering techniques to create an interactive game environment. It covers concepts such as translating, rotating, and projecting objects in 3D space.

2. **Visualization Techniques:** It also showcases visualization techniques by rendering projections of the 3D cube onto 2D planes to provide additional perspectives of the game world to help the player navigate through a 3D environment. It also provides a Heads-Up Display (HUD) providing necessary information to the player.

3. **User Interaction:** It also incorporates keyboard input for controlling the movement of the cube within the 3D environment by mapping of keyboard keys to specific actions like movement, acceleration and pausing.

4. **Game Logic:** The workshop also implements basic game mechanics, such as collision detection between the player's cube with the food and the arena boundaries. It also keeps track of the player's score as they collect the food.

# **Background**

The field of computer graphics and interactive 3D environments has been a subject of extensive research and development, with numerous studies focusing on various aspects of rendering, transformations, and user interaction.

One important area of research in computer graphics is the study of 2D and 3D transformations. Transformations play a fundamental role in creating immersive virtual environments and enabling interactive user experiences. There are different transformation techniques, such as translation, rotation, scaling, and projection, to manipulate objects in 2D and 3D space.

There are various algorithms and mathematical representations for performing transformations. Common approaches include matrix operations, Euler angles and quaternions.

The space transformations used in this workshop consist of only matrix operations, used to represent and move the position vectors of the player (cube) and the food.

Knowing that a vector may be interpreted geometrically as a sequence of axially-aligned displacements, if we interpret the rows of a matrix as the basis vectors of a coordinate space, then
multiplication by the matrix performs a coordinate space transformation. If aM=b,
we say that M transformed a to b [1].

# **Solution: P5 Sketch**

{{< p5-iframe sketch="/showcase/sketches/space-transformations/3d-snake.js" width="630" height="630" >}}

# **Solution: Code**

The ``setup()`` function sets up the camera control using the EasyCam library in a specific position so that all planes are visible.

```js
easycam = createEasyCam();
easycam.setState({  
    distance: 437, 
    center:   [0, 0, 0],
    rotation: [0.92, -0.09, 0.38, -0.03]
    }
);
```

It also initializes variables such as: player position and direction vectors; the food position vector, which has components of random values within the arena; keyboard mappings, that are defined as vectors, which will be added to the position vector to update the player position; and font for text rendering.

```js
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
```

The ``delayMovement()`` function controls the delayed movement of the player cube, so that it not moves at a high rate (of approximately 60 frames per second).

It also checks if the current time has exceeded the next move time (delaying the movement) and updates the player's position accordingly. It also checks for collisions between the player and the food, updating the score and randomizing the food's position if there is a collision (meaning the player grabbed the food). Additionally, it handles teleporting the player cube back to the center and resetting the score if it goes outside the arena.

```js
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
```

The ``drawArena()`` function draws the arena using projections on the XY, ZX, and ZY planes using lines and rectangles.

```js
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
```

The ``drawCube()`` function draws the player cube at its current position in the 3D space, using space transformations to achieve it.

```js
push();
translate(...playerPositionVector.array());
fill(0, 0, 0, 100);
box(CELL_SIZE);
pop();
```

Similarly, the ``drawFood()`` function draws the food item at its current position in the 3D space.

```js
push();
translate(...foodPositionVector.array());
fill(255, 0, 0, 100);
box(CELL_SIZE);
pop();
```

The ``drawProjections()`` function draws the projections of the any position vector onto the XY, ZX, and ZY planes using lines and rectangles. In the code, it is used for drawing the projections of both the player and the food.

```js
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
```

The ``drawHud()`` function renders the Heads-Up Display (HUD) on the screen using the EasyCam library, displaying the player's score and control instructions.

```js
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
```

The ``randomizeFoodPosition()`` function generates a random position for the food item within the arena. This function is called whenever there is a collision of the player with the food. For some reason the food was sometimes generated outside the arena, so it was encapsulated inside a loop that, before updating the food position vector, first validates if the food is inside the arena.

```js
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
```

The resulting code is as follows:

{{< details "Complete implementation">}}
```js
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
  
  //if (key === "d")console.log(easycam.getState())
  if (key === 'r') randomizeFoodPosition();
}
```
{{< /details >}}

# **Conclusions**

The workshop demonstrates the ability to create a 3D visualization using the p5.js library. It showcases how p5.js can be used to render 3D objects, handle camera perspectives, and apply transformations to create an immersive experience.

The implementation of the 3D cube within an arena allows users to navigate and interact with the environment. The code showcases techniques for representing spatial relationships and enables users to move and explore the 3D space using keyboard inputs.

It incorporates collision detection between the player (cube) and the food, providing an interaction mechanism within the 3D environment. This demonstrates how game elements can be incorporated into a 3D setting for future work.

It also showcases the creation of a Heads-Up Display (HUD) using p5.js, providing users with essential information such as the player score and control instructions.

The code also serves as a foundation for developing more complex games or interactive applications within a 3D environment.

# **Future work**

This is really close to become a 3D Snake Game, which was the original idea of the workshop. Currently, the code represents a single cube as the player's object. To convert it into a snake game, one would need to implement a snake body composed of multiple interconnected cubes. Each cube in the body would represent a segment of the snake. The snake would move in a continuous manner, with each segment following the position of the previous segment.

A queue would allow this, where each segment's position would represent its current location in the arena. The head of the queue will hold the position vector of the snake's head, while the tail will hold the position vector of the last segment. Whenever the snake moves, the head of the queue (representing the snake's head) will be updated with its new position vector based on the user's input and the current direction of the snake. The rest of the segments in the queue will follow suit.

# **References**

[1] F. DUNN, “Matrices and Linear Transformations,” in 3D math primer for graphics and game development, S.l.: CRC PRESS, 2022 