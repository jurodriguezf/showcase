---
title: Visual Illusions
type: docs
---

# **Visual Illusions**

# **Introduction**

*Visual illusions*, also known as *optical illusions*, are perceptual phenomena that deceive or mislead our visual system, causing us to perceive things differently from how they actually are. These illusions occur due to the way our eyes, brain, and visual processing system interpret and process visual information.

*Visual illusions* can take various forms and exploit different aspects of our perception, including depth, motion, size, color, and shape. They often challenge our assumptions and expectations about how objects should appear or behave.

Some common types of visual illusions include:

1. **Geometrical illusions:** These illusions involve distorted shapes, angles, or patterns that deceive our perception of size, length, or proportion.

2. **Motion illusions:** These illusions create an impression of movement or motion where none exists or cause perceived movement in the opposite direction of the actual motion.

3. **Ambiguous illusions:** These illusions present images or patterns that can be interpreted in multiple ways, leading to perceptual ambiguity or the ability to see two or more different images within the same stimulus.

4. **Color illusions:** These illusions exploit the way our eyes perceive colors, causing colors to appear different based on their surrounding context or inducing illusory color gradients or afterimages.

5. **Depth illusions:** These illusions manipulate our perception of depth, making objects appear closer or farther away than they actually are, or creating the perception of three-dimensional depth in two-dimensional images.

# **Background**

Ancient Greek philosophers, such as Empedocles and Democritus, pondered the nature of perception and proposed theories about how the eyes and the mind interacted to create visual experiences. However, it was during the Renaissance period that optical illusions gained more attention.

In the 15th century, Italian artists, including Filippo Brunelleschi and Leon Battista Alberti, explored techniques of linear perspective, which aimed to create realistic three-dimensional representations on a two-dimensional surface. These advancements in artistic perspective influenced the development of visual illusions, as artists discovered ways to manipulate depth, angles, and proportions to create perceptual distortions and surprising effects.

During the 19th and 20th centuries, researchers and psychologists began conducting scientific investigations into visual perception and illusions. Johann Joseph Oppel, Hermann von Helmholtz, and Gustav Theodor Fechner made significant contributions to understanding visual illusions and the principles behind them. They laid the groundwork for future researchers, such as the Gestalt psychologists, who studied how our brain organizes visual elements into coherent patterns and forms.

# **Solution**

Here we can observe 3 sketches implementing different common visual illusions:

## **Lilac Chaser Illusion**

The lilac chaser is a visual illusion, also known as the Pac-Man illusion. It consists of 12 lilac blurred discs arranged in a circle around a small black, central cross on a gray background.

One of the discs disappears briefly, then the next and so on, in a clockwise direction. Staring at the cross for at least 30 seconds creates 3 illusions:

1. A gap running around the circle of lilac discs.
2. A green disc running around the circle of lilac discs in place of the gap.
3. The green disc running around on the grey background, with the lilac discs having disappeared in sequence.

The lilac chaser illusion was created by **Jeremy Hinton** before 2005.

The chaser effect results from the **phi phenomenon illusion**, combined with an **afterimage effect** in which an opposite color, or **complementary** color – green – appears when each lilac spot disappears (if the discs were blue, one would see yellow), and **Troxler's fading** of the lilac discs. 

{{< p5-iframe sketch="/showcase/sketches/illusions/lilac-chaser.js" width="425" height="425" >}}

### Lilac Chaser Illusion Code

```js
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
```

{{< hint info >}}
**Important note:**

You might have noticed that ``drawingContext.filter`` is used instead of p5's ``filter(BLUR)``. The ``drawingContext.filter`` property from HTML Canvas API operates at a lower level, directly manipulating the rendering context of the canvas. This means that it can be more efficient when it comes to applying filters, as it bypasses the overhead of the p5.js library's abstraction layer. Using ``filter(BLUR)`` in the ``draw()`` function dropped the frame rate by a great amount.
{{< /hint >}}

## **Pinna-Gregory Illusion**

This illusion was first described by Baingio Pinna and Richard L Gregory in a 2002 article titled *“Shifts of Edges and Deformations of Patterns“*. It is an optical illusion that involves a perception of movement or rotation in a static image, and occurs when certain patterns of radial lines are presented in a circular or spiral configuration.

The Pinna-Gregory Illusion is a fascinating example of how our visual system can be tricked into perceiving motion in static images, highlighting the complex nature of human perception and the brain's ability to interpret visual stimuli.

{{< p5-iframe sketch="/showcase/sketches/illusions/pinna-gregory.js" width="425" height="425" >}}

### Pinna-Gregory Illusion Code

```js
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
```

## **Scintillating Grid Illusion**

The scintillating grid illusion is an optical illusion, discovered by E. and B. Lingelbach and M. Schrauf in 1994. It is considered a variation of the Hermann grid illusion but it possesses different properties.

The scintillating grid illusion is constructed by superimposing white discs on the intersections of orthogonal gray bars on a black background.

When one focuses their gaze directly on any intersection point of the grid, one may notice that the white dots disappear or appear faint. Instead, tiny dark dots appearing and disappearing at the intersections adjacent are perceived to where one is looking. As the gaze is shifted, the dots appear to move and scintillate.

{{< p5-iframe sketch="/showcase/sketches/illusions/scintillating-grid.js" width="425" height="425" >}}

### Scintillating Grid Illusion Code

```js
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
```

# **Conclusions**

In the Lilac Chaser Illusion, the brain fills in the gap left by the disappearing purple discs with an illusory green disc. Similarly, in the Pinna-Gregory Illusion and the Scintillating Grid Illusion, our brain generates illusory motion and dark dots respectively to complete the visual experience.

The Pinna-Gregory Illusion and the Scintillating Grid Illusion both involve the perception of motion in static images. They highlight how our visual system is sensitive to motion cues and tends to interpret visual stimuli in terms of movement, even when there is no actual motion present.

These illusions reveal the intricate nature of visual perception, showing how our brain's interpretation of visual stimuli is influenced by factors such as context, motion processing, neural adaptation, and completion of missing information. They provide valuable insights into the mechanisms and limitations of human visual perception

# **Future work**

The illusions by itself cannot be improved, as they are implemented the way they are meant to. However, more complex illusions can be implemented in additional sketches.