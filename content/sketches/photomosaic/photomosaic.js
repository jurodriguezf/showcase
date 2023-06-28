let sourceImage;
let library = [];

let minPokemon = 1;
let maxPokemon = 400;

let tileSize = 10;

let differences = [];

function preload() {
  let randomPokemonNum = Math.floor(Math.random() * (maxPokemon - minPokemon + 1) + minPokemon);
  sourceImage = loadImage('pokemon-img-db/' + randomPokemonNum + '.jpg');
  
  for (let i = 1; i <= 50; i++) {
    let img = loadImage('pokemon-img-db/' + i + '.jpg');
    library.push(img);
  }
  
  // Pre-calculate and cache the differences
  for (let i = 0; i < library.length; i++) {
    differences[i] = [];
    for (let j = 0; j < library.length; j++) {
      differences[i][j] = calculateDifference(library[i], library[j]);
    }
  }
}

function setup() {
  createCanvas(sourceImage.width, sourceImage.height);
  noLoop();
  createPhotomosaic();
}

function createPhotomosaic() {
  for (let y = 0; y < sourceImage.height; y += tileSize) {
    for (let x = 0; x < sourceImage.width; x += tileSize) {
      // Extract a region from the source image
      let region = sourceImage.get(x, y, tileSize, tileSize);

      // Find the best match from the library for the current region
      let bestMatch = findBestMatch(region);

      // Draw the best match in place of the region
      image(bestMatch, x, y, tileSize, tileSize);
    }
  }
}

function findBestMatch(region) {
  let bestMatchIndex = 0; // Initialize with the index of the first image
  let bestMatch = library[bestMatchIndex];
  let bestDifference = calculateDifference(region, bestMatch);

  // Compare the region with each image in the library
  for (let i = 1; i < library.length; i++) { // Start from index 1
    let currentDifference = differences[i][bestMatchIndex]; // Use pre-calculated difference
    if (currentDifference === undefined) {
      currentDifference = calculateDifference(region, library[i]);
      differences[i][bestMatchIndex] = currentDifference; // Cache the new difference
      differences[bestMatchIndex][i] = currentDifference; // Store the symmetric difference
    }

    // Update the best match if the current image has a lower difference
    if (currentDifference < bestDifference) {
      bestMatchIndex = i;
      bestMatch = library[bestMatchIndex];
      bestDifference = currentDifference;
    }
  }

  return bestMatch;
}


function calculateDifference(img1, img2) {
  // Calculate the difference between two images (e.g., pixel-wise difference)

  // You can use different techniques for image comparison,
  // such as calculating the sum of squared differences or using image similarity algorithms.

  // Here it is used the pixel-wise difference
  img1.loadPixels();
  img2.loadPixels();
  let diff = 0;

  for (let i = 0; i < img1.pixels.length; i++) {
    diff += Math.abs(img1.pixels[i] - img2.pixels[i]);
  }

  return diff;
}

function draw() {
  // No need to include any code here since the photomosaic is already generated in setup()
}
