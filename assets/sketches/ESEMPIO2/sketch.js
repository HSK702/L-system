var axiom = "FG"; 
var sentence = axiom;
var initialLen = 140;
var len = initialLen;
var count = 0;

var rule1 = { a: "F", b: "F-G" };
var rule2 = { a: "G", b: "F+G" };

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
  btnReset.mousePressed(resetLSystem); 
  styleButton(btnReset);
  
  var regoleGui = createDiv();
  regoleGui.parent(gui);
  regoleGui.style('margin-top', '15px'); 
  regoleGui.style('font-weight', 'bold');
  regoleGui.style('display', 'flex');
  regoleGui.style('align-items', 'center');
  regoleGui.style('gap', '5px');

  regoleGui.child(createSpan("F → "));
  inputRule1 = createInput(rule1.b);
  styleInput(inputRule1);
  inputRule1.input(function() {
    rule1.b = this.value();
    aggiornaLarghezzaInput(this);
  });
  inputRule1.parent(regoleGui);

  var spazio = createSpan("&nbsp;&nbsp;&nbsp;");
  spazio.parent(regoleGui);

  regoleGui.child(createSpan("G → "));
  inputRule2 = createInput(rule2.b);
  styleInput(inputRule2);
  inputRule2.input(function() {
    rule2.b = this.value();
    aggiornaLarghezzaInput(this);
  });
  inputRule2.parent(regoleGui);
  
  aggiornaLarghezzaInput(inputRule1);
  aggiornaLarghezzaInput(inputRule2);
  
  disegnaTurtle();
}

function styleButton(btn) {
  btn.style('padding', '8px 16px');
  btn.style('font-size', '16px');
  btn.style('cursor', 'pointer');
  btn.style('color', 'rgb(240, 230, 218)');
  btn.style('background-color', 'rgb(79, 104, 21)');
  btn.style('border', '1.5px solid rgb(240, 230, 218)');
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

function generate() {
  if (count > 14) return;

  rule1.b = inputRule1.value();
  rule2.b = inputRule2.value();

  len *= 0.707; 
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

function resetLSystem() {
  rule1.b = inputRule1.value();
  rule2.b = inputRule2.value();

  sentence = axiom;
  len = initialLen;
  count = 0;
  disegnaTurtle();
}

function disegnaTurtle() {
  background(240, 230, 218); 
  resetMatrix();

  var posX = 0;
  var posY = 0;
  var currentAngle = 0;
  
  var minX = 0, maxX = 0, minY = 0, maxY = 0;
  
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current == "F" || current == "G") {
      posX += len * cos(currentAngle);
      posY += len * sin(currentAngle);
      if (posX < minX) minX = posX;
      if (posX > maxX) maxX = posX;
      if (posY < minY) minY = posY;
      if (posY > maxY) maxY = posY;
    } else if (current == "+") {
      currentAngle += 90;
    } else if (current == "-") {
      currentAngle -= 90;
    }
  }
  
  var disegnoWidth = maxX - minX;
  var disegnoHeight = maxY - minY;
  
  var startX = (width - disegnoWidth) / 2 - minX;
  var startY = (height - disegnoHeight) / 2 - minY;
  
  translate(startX, startY);
  
  stroke(79, 104, 21);    
  strokeWeight(1.5);  
  
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
  
    if (current == "F" || current == "G") {
      line(0, 0, len, 0); 
      translate(len, 0);  
    } else if (current == "+") {
      rotate(90);  
    } else if (current == "-") {
      rotate(-90); 
    }
  }
}

function draw() {
}