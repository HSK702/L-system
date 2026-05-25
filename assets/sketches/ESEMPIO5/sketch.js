var axiom = "F";
var sentence = axiom;
var initialLen = 450; 
var len = initialLen;
var count = 0;

var rule1 = { a: "F", b: "G-F-G" };
var rule2 = { a: "G", b: "F+G+F" };

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  
  // Contenitore per i bottoni
  var gui = createDiv();
  gui.style('margin-bottom', '10px');

  var btnGen = createButton("Genera");
  btnGen.parent(gui);
  btnGen.mousePressed(generate);
  styleButton(btnGen);
  var btnReset = createButton("Reset");
  btnReset.parent(gui);
  btnReset.style('margin-left', '10px');
  btnReset.mousePressed(resetCanvas);
  styleButton(btnReset);
  
  disegnaTurtle();
}


function styleButton(btn) {
  btn.style('padding', '10px 20px');
  btn.style('font-size', '18px');
  btn.style('cursor', 'pointer');
  btn.style('background-color', '#f0f0f0');
  btn.style('border', '1px solid #ccc');
  btn.style('border-radius', '5px');
}

function resetCanvas() {
  sentence = axiom;
  len = initialLen;
  count = 0;
  disegnaTurtle();
}

function generate() {
  if (count > 6) return; // Limite per evitare crash del browser
  
  len *= 0.5;
  count++;

  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current === rule1.a) {
      nextSentence += rule1.b;
    } else if (current === rule2.a) {
      nextSentence += rule2.b;
    } else {
      nextSentence += current;
    }
  }
  
  sentence = nextSentence;
  disegnaTurtle();
}

function disegnaTurtle() {
  background(255);
  push();

  var rotazioneIniziale = -60;
  if (count % 2 !== 0) {
    rotazioneIniziale = 0;
  }

  var x = 0, y = 0, angle = rotazioneIniziale;
  var minX = 0, maxX = 0, minY = 0, maxY = 0;

  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current == "F" || current == "G") {
      x += len * cos(angle);
      y += len * sin(angle);
      minX = min(minX, x); maxX = max(maxX, x);
      minY = min(minY, y); maxY = max(maxY, y);
    } else if (current == "+") {
      angle += 60;
    } else if (current == "-") {
      angle -= 60;
    }
  }

  var dW = maxX - minX;
  var dH = maxY - minY;
  var xInizio = (width - dW) / 2 - minX;
  var yInizio = (height - dH) / 2 - minY;

  translate(xInizio, yInizio);
  rotate(rotazioneIniziale);

  stroke(0);
  strokeWeight(1.5);

  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current == "F" || current == "G") {
      line(0, 0, len, 0);
      translate(len, 0);
    } else if (current == "+") {
      rotate(60);
    } else if (current == "-") {
      rotate(-60);
    }
  }
  pop();
}

function draw() {
}
