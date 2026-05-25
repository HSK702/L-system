var axiom = "A";
var sentence = axiom;
var count = 0;
var side;

var rules = {
  "A": "+BF-AFA-FB+",
  "B": "-AF+BFB+FA-"
};

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  side = 300;
  
  var gui = createDiv();
  gui.style('margin-bottom', '10px');

  var btnGen = createButton("genera");
  btnGen.parent(gui);
  btnGen.mousePressed(generate);
  styleButton(btnGen);

  var btnReset = createButton("reset");
  btnReset.parent(gui);
  btnReset.style('margin-left', '10px');
  btnReset.mousePressed(resetCanvas);
  styleButton(btnReset);
  
  disegnaHilbert();
}

function styleButton(btn) {
  btn.style('padding', '10px 20px');
  btn.style('font-size', '18px');
  btn.style('cursor', 'pointer');
  btn.style('background-color', '#f8f8f8');
  btn.style('border', '1px solid #333');
  btn.style('border-radius', '4px');
}

function resetCanvas() {
  sentence = axiom;
  count = 0;
  side = 300;
  disegnaHilbert();
}

function generate() {
  if (count >= 7) return; 
  count++;
  side /= 2;

  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    nextSentence += rules[current] ? rules[current] : current;
  }
  sentence = nextSentence;
  disegnaHilbert();
}

function disegnaHilbert() {
  background(255);
  stroke(0);
  strokeWeight(2);
  noFill();

  var posX = 0, posY = 0, angle = 0;
  var minX = 0, maxX = 0, minY = 0, maxY = 0;

  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current === "F") {
      posX += side * cos(angle);
      posY += side * sin(angle);
      minX = min(minX, posX);
      maxX = max(maxX, posX);
      minY = min(minY, posY);
      maxY = max(maxY, posY);
    } else if (current === "+") {
      angle += 90;
    } else if (current === "-") {
      angle -= 90;
    }
  }

  var drawingW = maxX - minX;
  var drawingH = maxY - minY;
  var xOffset = (width - drawingW) / 2 - minX;
  var yOffset = (height - drawingH) / 2 - minY;

  push();
  translate(xOffset, yOffset);
  
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current === "F") {
      line(0, 0, side, 0);
      translate(side, 0);
    } else if (current === "+") {
      rotate(90);
    } else if (current === "-") {
      rotate(-90);
    }
  }
  pop();
}

function draw() {}
