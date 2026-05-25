var axiom = "F"; 
var sentence = axiom;

var generation = 0; 
var currentLen; 

var rule = {
  a: "F",
  b: "F[-F]F[-F]+FF" 
};

var inputRule1;

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
  inputRule1 = createInput(rule.b);
  styleInput(inputRule1);
  inputRule1.input(function() {
    rule.b = this.value();
    aggiornaLarghezzaInput(this);
  });
  inputRule1.parent(regoleGui);
  
  aggiornaLarghezzaInput(inputRule1);
  
  disegnaTurtle();
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

function generate() {
  if (generation > 4) return; 
  
  rule.b = inputRule1.value();

  generation++; 

  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    
    if (current === rule.a) {
      nextSentence += rule.b;
    } else {
      nextSentence += current;
    }
  }
  
  sentence = nextSentence; 
  disegnaTurtle();
}

function resetLSystem() {
  rule.b = inputRule1.value();

  sentence = axiom;
  generation = 0;
  disegnaTurtle();
}

function disegnaTurtle() {
  background(240, 230, 218); 
  resetMatrix();

  var baseLen = 90; 
  currentLen = baseLen * pow(0.5, generation); 

  var currentX = 0;
  var currentY = 0;
  var currentAngle = -90; 
  var stateStack = [];
  
  var minX = 0, maxX = 0, minY = 0, maxY = 0;
  
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    
    if (current == "F") {
      currentX += currentLen * cos(currentAngle);
      currentY += currentLen * sin(currentAngle);
      
      if (currentX < minX) minX = currentX;
      if (currentX > maxX) maxX = currentX;
      if (currentY < minY) minY = currentY;
      if (currentY > maxY) maxY = currentY;
    } else if (current == "+") {
      currentAngle += 22.5;
    } else if (current == "-") {
      currentAngle -= 22.5;
    } else if (current == "[") {
      stateStack.push({ x: currentX, y: currentY, angle: currentAngle });
    } else if (current == "]") {
      var savedState = stateStack.pop();
      currentX = savedState.x;
      currentY = savedState.y;
      currentAngle = savedState.angle;
    }
  }
  
  var disegnoWidth = maxX - minX;
  var disegnoHeight = maxY - minY;
  
  var startX = (width - disegnoWidth) / 2 - minX;
  var startY = (height - disegnoHeight) / 2 - minY;
  
  translate(startX, startY);
  rotate(-90); 
  
  var pesoTratto = max(0.6, 3.5 - generation * 0.6);
  stroke(79, 104, 21);        
  strokeWeight(pesoTratto);  
  
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
  
    if (current == "F") {
      line(0, 0, currentLen, 0); 
      translate(currentLen, 0);  
    } else if (current == "+") {
      rotate(22.5); 
    } else if (current == "-") {
      rotate(-22.5); 
    } else if (current == "[") {
      push(); 
    } else if (current == "]") {
      pop(); 
    }
  }
}

function draw() {
}