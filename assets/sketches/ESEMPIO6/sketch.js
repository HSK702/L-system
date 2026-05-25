var axiom = "A";
var sentence = axiom;
var side = 300;
var count = 0;

var rules = {
  "A": "+BF-AFA-FB+",
  "B": "-AF+BFB+FA-"
};

var inputRule1, inputRule2;

function setup() {
  var canvas = createCanvas(400, 400);
  angleMode(DEGREES);
  canvas.style('border', '2px solid rgb(79, 104, 21)');
  canvas.style('border-radius', '20px');
  
  var gui = createDiv();
  gui.style('margin-top', '20px'); 
  gui.style('font-family', 'sans-serif');
  gui.style('color', 'rgb(79, 104, 21)');

  var bottoniGui = createDiv();
  bottoniGui.parent(gui);

  var btnGen = createButton("genera");
  btnGen.parent(bottoniGui);
  btnGen.mousePressed(generate);
  styleButton(btnGen);

  var btnReset = createButton("reset");
  btnReset.parent(bottoniGui);
  btnReset.style('margin-left', '10px');
  btnReset.mousePressed(resetCanvas);
  styleButton(btnReset);
  
  var regoleGui = createDiv();
  regoleGui.parent(gui);
  regoleGui.style('margin-top', '15px'); 
  regoleGui.style('font-weight', 'bold');
  regoleGui.style('display', 'flex');
  regoleGui.style('align-items', 'center');
  regoleGui.style('gap', '5px');

  regoleGui.child(createSpan("A → "));
  inputRule1 = createInput(rules["A"]);
  styleInput(inputRule1);
  inputRule1.input(function() {
    rules["A"] = this.value();
    aggiornaLarghezzaInput(this);
  });
  inputRule1.parent(regoleGui);

  var spazio = createSpan("&nbsp;&nbsp;&nbsp;");
  spazio.parent(regoleGui);

  regoleGui.child(createSpan("B → "));
  inputRule2 = createInput(rules["B"]);
  styleInput(inputRule2);
  inputRule2.input(function() {
    rules["B"] = this.value();
    aggiornaLarghezzaInput(this);
  });
  inputRule2.parent(regoleGui);
  
  aggiornaLarghezzaInput(inputRule1);
  aggiornaLarghezzaInput(inputRule2);
  
  disegnaHilbert();
}

function styleButton(btn) {
  btn.style('padding', '8px 16px');
  btn.style('font-size', '16px');
  btn.style('cursor', 'pointer');
  btn.style('color', 'rgb(79, 104, 21)');
  btn.style('background-color', 'rgb(240, 230, 218)');
  btn.style('border', '1.5px solid rgb(79, 104, 21)');
  btn.style('border-radius', '10px'); 
  btn.style('text-transform', 'lowercase'); 
}

function styleInput(inp) {
  inp.style('padding', '6px 10px');
  inp.style('font-size', '14px');
  inp.style('color', 'rgb(79, 104, 21)');
  inp.style('background-color', 'rgb(240, 230, 218)');
  inp.style('border', '1px solid rgb(79, 104, 21)');
  inp.style('border-radius', '6px'); 
  inp.style('font-family', 'monospace');
}

function aggiornaLarghezzaInput(elemento) {
  elemento.style('width', Math.max(60, elemento.value().length * 8) + 'px');
}

function resetCanvas() {
  rules["A"] = inputRule1.value();
  rules["B"] = inputRule2.value();
  
  sentence = axiom;
  side = 300;
  count = 0;
  disegnaHilbert();
}

function generate() {
  if (count > 6) return; 
  
  rules["A"] = inputRule1.value();
  rules["B"] = inputRule2.value();
  
  side *= 0.5;
  count++;

  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current === "A") {
      nextSentence += rules["A"];
    } else if (current === "B") {
      nextSentence += rules["B"];
    } else {
      nextSentence += current;
    }
  }
  
  sentence = nextSentence;
  disegnaHilbert();
}

function disegnaHilbert() {
  background(240, 230, 218);
  push();

  var posX = 0, posY = 0, angle = 0;
  var minX = 0, maxX = 0, minY = 0, maxY = 0;

  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current === "F") {
      posX += side * cos(angle);
      posY += side * sin(angle);
      minX = min(minX, posX); maxX = max(maxX, posX);
      minY = min(minY, posY); maxY = max(maxY, posY);
    } else if (current === "+") {
      angle += 90;
    } else if (current === "-") {
      angle -= 90;
    }
  }

  var dW = maxX - minX;
  var dH = maxY - minY;
  
  if (dW === 0) dW = 1;
  if (dH === 0) dH = 1;

  var margine = 20;
  var maxDisponibile = width - (margine * 2);
  
  var scalaX = maxDisponibile / dW;
  var scalaY = maxDisponibile / dH;
  var fattoreScala = min(scalaX, scalaY);

  if (fattoreScala > 1) fattoreScala = 1;

  var xInizio = (width - (dW * fattoreScala)) / 2 - (minX * fattoreScala);
  var yInizio = (height - (dH * fattoreScala)) / 2 - (minY * fattoreScala);

  translate(xInizio, yInizio);
  scale(fattoreScala);

  stroke(79, 104, 21);
  strokeWeight(1.5 / fattoreScala);

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

function draw() {
}