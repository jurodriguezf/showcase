let img;
let size = 7;
let sizeSlider;
let startx = 0;
let starty = 0;

function preload() {
  img = loadImage("https://random.imagecdn.app/450/450");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // creates canvas
  sizeSlider = createSlider(5, 50, 30);
  sizeSlider.position(20, 20);

  img.loadPixels(); // loads image
  img.resize(windowWidth, 0); // resizes image to window size
  img.updatePixels(); // updates image
}

function draw() {
  clear();
  background(0);

  // let size = floor(map(mouseX, 0, width, 7, 40)); // maps mouseX value to element size
  let size = floor(sizeSlider.value());
  console.log("size :>> ", size);

  for (var starty = 0; starty < img.height; starty++) {
    // creates pixel index
    for (var startx = 0; startx < img.width; startx++) {
      var index = (startx + starty * img.width) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      var bright = 0.3 * r + 0.59 * g + 0.11 * b; // sets pixel value to adjusted grayscale

      fill(bright); // fills element with adjusted grayscale

      rect(startx, starty, size, size);

      startx = startx + size - 1; // set new startx value
    }
    starty = starty + size - 1; // set new starty value
  }
}
