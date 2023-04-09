// visualization.js
let primaryClassification;
let secondaryClassifications = [];
let canvas;
let textCanvas;
let myFont;

function preload() {
  myFont = loadFont('assets/SpaceGrotesk-Regular.ttf'); // Replace 'your_font_file.ttf' with the path to your font file
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('visualization-container');
  textSize(20); // Increase the text size if needed
  textFont(myFont);
  textSize(20); // Increase the text size if needed

  textCanvas = createGraphics(windowWidth, windowHeight);
  textCanvas.parent('text-container');
  textCanvas.textSize(20);
}

function draw() {
  background(0);
  orbitControl(2, 2);
  translate(-width / 4, 0, -800); // Center the content within the canvas and zoom out more

  stroke(255, 127, 0);
  noFill();

  // Draw primary classification dot and text
  if (primaryClassification) {
    const { x, y, z } = get3DCoordinates(primaryClassification);
    push();
    translate(x, y, z);
    fill(255, 127, 0);
    stroke(255, 127, 0);
    sphere(15);
    pop();
  }

  // Draw secondary classifications dots
  let prevX, prevY, prevZ;
  for (let i = 0; i < secondaryClassifications.length; i++) {
    const classification = secondaryClassifications[i];
    const { x, y, z } = get3DCoordinates(classification);
    push();
    translate(x, y, z);
    fill(255, 127, 0);
    stroke(255, 127, 0);
    sphere(5);
    pop();
    if (prevX !== undefined && prevY !== undefined && prevZ !== undefined) {
      line(prevX, prevY, prevZ, x, y, z);
    }
    prevX = x;
    prevY = y;
    prevZ = z;
  }

  // Draw text on the separate 2D canvas
  textCanvas.clear();
  textCanvas.fill(255, 165, 0);
  textCanvas.stroke(255, 165, 0);

  if (primaryClassification) {
    const { x, y } = get2DCoordinates(primaryClassification);
    textCanvas.text(primaryClassification.classification + ' ' + primaryClassification.label, x, y);
  }

  for (let i = 0; i < secondaryClassifications.length; i++) {
    const classification = secondaryClassifications[i];
    const { x, y } = get2DCoordinates(classification);
    textCanvas.text(classification.classification + ' ' + classification.label, x, y);
  }
}


function get2DCoordinates(classification) {
  const number = parseFloat(classification.classification); // Convert the classification string to a float
  const x = ((Math.floor(number) / 10) * 100) % width; // Calculate the x coordinate
  const y = ((number - Math.floor(number)) * 10) * 40; // Calculate the y coordinate

  return { x, y };
}

function updateClassifications(primary, secondary) {
  primaryClassification = {
    classification: primary,
    label: "" // Empty label since we don't have a label for this primary classification
  };
  secondaryClassifications = secondary.map((classification) => {
    return {
      classification: classification,
            label: "" // Empty label since we don't have labels for these secondary classifications
    };
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
