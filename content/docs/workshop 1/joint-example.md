---
title: Linear Perspective, DOF, Parallax
type: docs
---

# **Joint workshop: Linear Perspective, DOF and Parallax**

# **Introduction**

*Linear perspective* is a technique used by artists to create the illusion of depth and space using relative size and position of a group of objects. To achieve this effect, there are **three** essential components needed in creating a painting or drawing using linear perspective:

1. Orthogonals (also known as parallel lines)
2. Vanishing point
3. Horizon line

Using these components, it is possible to arrange the composition of a work of art in a way similar to how the human eye sees the world. The guiding principle for this technique is that objects that are **closer** to the viewer appear to be **larger**, where objects that are **further** away appear to be **smaller**. In order to accomplish this, the artist places a horizontal line across the surface of the picture, which is known as the “horizon line.” Parallel lines (or orthogonals) then converge as they meet at the vanishing point on the horizon line.

*Depth-of-field* (DOF) refers to the range of distance in a photograph or video that appears acceptably sharp. In simpler terms, it's the area in front of and behind the subject that appears in focus. A shallow depth of field means that only a small portion of the image is in focus, while a deep depth of field means that a larger portion of the image is in focus.

*Parallax* is the apparent displacement or shift in the position of an object when viewed from different angles. It occurs due to the difference in the observer's line of sight between two points. Parallax is often used to describe the phenomenon observed when looking at an object and shifting your viewpoint, causing the object to appear to move relative to the background.

# **Background**

In the early 15th century, a Italian architect called Filippo Brunelleschi (1377–1446) invented a way of representing the recession of space, called linear perspective. In Brunelleschi's technique, the lines appear to converge on a single fixed point in the distance. This produces a convincing representation of spatial depth on a two-dimensional surface.

Brunelleschi used this technique in a famous experiment. With the help of mirrors, he drew the Baptistery in perfect perspective. He mathematically calculated the scale of the objects that appear within a painting, so that they look realistic.

![Brunelleschi](https://nelson-atkins.org/gates/images/Brunelleschi.jpg 'Baptistery by Brunelleschi')

This discovery of a mathematical system for representing three-dimensional objects and space on a two-dimensional surface was very significant. Shortly after Brunelleschi's discovery, other artists started employing this method of rendering perspective.

Two-point and three-point perspectives came later, most notably through the writer Jean Pelerin, known by the name Viator. In his *De Artificiali Perspective, 1505*, he wrote of the use of two other 'level points' alongside the central vanishing point, which enabled artists to depict buildings viewed from a number of unusual or oblique angles.

![Viator](https://cdn.thecollector.com/wp-content/uploads/2022/10/viator-three-point-perspective.jpg?width=400&quality=55 'Viator Three point perspective')

# **Solution**

Here we can observe an sketch involving an application of linear perspective, depth-of-field and parallax using JavaScript.

We can picture a road made of two orthogonals that converge in a vanishing point inside the tunnel. There's also a horizon line that separates the road and the mountains, and randomly generated trees above the horizon line. Additionally, there multiple layers of snow moving at different speeds and sizes relative to each other, creating a sense of depth. Finally, the use of blur, applied to various elements like the sky, trees, tunnel and road, creates a sense of depth by mimicking the blurring effect that occurs in the out-of-focus areas.

## **P5 Sketch**

{{< p5-iframe sketch="/showcase/sketches/visual-illusions/binocular-cues.js" width="430" height="430" >}}

# **Code**

Here lies the code implementation:

{{< details "Implementation">}}
```js
let mountainHeights = [];

let circles = [];
const numCircles = 10;

function setup() {
  createCanvas(400, 400);
  background(220);

  // Generate random mountain heights
  let numMountains = 10;
  for (let i = 0; i < numMountains; i++) {
    mountainHeights.push(random(height / 2));
  }

  // Initialize circles
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width),
      y: -random(100, 300),
      radius: random(2, 10),
      speed: random(1, 5)
    });
  }
}

function draw() {
  let gap = 50

  drawingContext.filter = 'blur(12px)';
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

  drawingContext.filter = 'none';

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

  drawingContext.filter = 'blur(12px)';

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

  drawingContext.filter = 'blur(3px)';

  // Tunnel outline
  stroke(0, 0, 0, 0);
  fill(50, 50, 50);
  rect(width/2 - gap - 10, 200, 2*gap + 20, -110, 0, 0, 30, 30);

  // Tunnel
  stroke(0, 0, 0, 0);
  fill(30, 30, 30);
  rect(width/2 - gap, 200, 2*gap, -100, 0, 0, 30, 30);

  // Update and display snow
  for (let i = 0; i < numCircles; i++) {
    let circle = circles[i];
    
    // Update position
    circle.y += circle.speed;
    
    // Reset position
    if (circle.y > height + circle.radius) {
      circle.y = -circle.radius;
    }
    
    fill(255);
    ellipse(circle.x, circle.y, circle.radius * 2);
  }
  
}
```
{{< /details >}}

# **Conclusions**

Prior to the creation of linear perspective, art had mainly been focused on flat looking religious and mythological imagery, but now artists were moving toward portraiture and a more naturalistic style of presentation. It opened the door for artists all around to become more creative and add more realism to their pieces.

Linear perspective is evident in the way the elements are drawn. The mountains are progressively smaller and lighter in color as they recede into the distance, following the principles of linear perspective, along with the rest of the elements in the image like the road. This technique adds depth and creates a sense of distance in the scene.

Parallax is a concept commonly used in visual arts and photography. The composition of the scene, including the placement and scaling of elements, mainly the falling snow, provides a visual suggestion of depth and can be associated with parallax in a broader sense.

In the concept of depth of field, the use of filters like blur creates a simulated depth of field effect. By selectively blurring certain elements, such as the sky, trees, and such, the scene mimics the visual experience of depth of field, where objects closer to the viewer appear sharper while those further away appear progressively more blurred.

# **Future work**

This sketch could be further improved by, instead of applying a uniform blur to elements, simulate depth of field more realistically by applying varying levels of blur based on an object's distance from the camera. This effect could be achieved through depth-based rendering techniques or post-processing effects.

To make the scene feel more interactive and responsive, interactive elements that respond to user input or environmental factors could be added. For example, you could include dynamic lighting that changes or user-controlled objects that can be manipulated within the scene.

Another way to improve this code is by incorporating more nuanced color variations, textures, and lighting effects to enhance the overall realism.