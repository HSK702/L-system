var axiom = "[N]++[N]++[N]++[N]++[N]";
var sentence = axiom;
var count = 0;
var side;

var rules = {
  "M": "OA++PA----NA[-OA----MA]++",
  "N": "+OA--PA[---MA--NA]+",
  "O": "-MA++NA[+++OA++PA]-",
  "P": "--OA++++MA[+PA++++NA]--NA"
};

var inputM, inputN, inputO, inputP;

function setup() {
  var canvas = createCanvas(400, 400);
  angleMode(DEGREES);
  canvas.style('border', '2px solid rgb(79, 104, 21)');
  canvas.style('border-radius', '20px');
  
  side = 20;

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

  regoleGui.child(createSpan("M → "));
  inputM = createInput(rules["M"]);
  styleInput(inputM);
  inputM.input(function() {
    rules["M"] = this.value();
    aggiornaLarghezzaInput(this);
  });
  inputM.parent(regoleGui);

  var spazio1 = createSpan("&nbsp;&nbsp;&nbsp;");
  spazio1.parent(regoleGui);

  regoleGui.child(createSpan("N → "));
  inputN = createInput(rules["N"]);
  styleInput(inputN);
  inputN.input(function() {
    rules["N"] = this.value();
    aggiornaLarghezzaInput(this);
  });
  inputN.parent(regoleGui);

  var spazio2 = createSpan("&nbsp;&nbsp;&nbsp;");
  spazio2.parent(regoleGui);

  regoleGui.child(createSpan("O → "));
  inputO = createInput(rules["O"]);
  styleInput(inputO);
  inputO.input(function() {
    rules["O"] = this.value();
    aggiornaLarghezzaInput(this);
  });
  inputO.parent(regoleGui);

  var spazio3 = createSpan("&nbsp;&nbsp;&nbsp;");
  spazio3.parent(regoleGui);

  regoleGui.child(createSpan("P → "));
  inputP = createInput(rules["P"]);
  styleInput(inputP);
  inputP.input(function() {
    rules["P"] = this.value();
    aggiornaLarghezzaInput(this);
  });
  inputP.parent(regoleGui);
  
  aggiornaLarghezzaInput(inputM);
  aggiornaLarghezzaInput(inputN);
  aggiornaLarghezzaInput(inputO);
  aggiornaLarghezzaInput(inputP);
  
  disegnaPenrose();
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

function resetCanvas() {
  rules["M"] = inputM.value();
  rules["N"] = inputN.value();
  rules["O"] = inputO.value();
  rules["P"] = inputP.value();
  
  sentence = axiom;
  side = 20;
  count = 0;
  disegnaPenrose();
}

function generate() {
  if (count >= 5) return; 
  
  rules["M"] = inputM.value();
  rules["N"] = inputN.value();
  rules["O"] = inputO.value();
  rules["P"] = inputP.value();
  
  count++;

  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    nextSentence += rules[current] !== undefined ? rules[current] : current;
  }
  
  sentence = nextSentence;
  disegnaPenrose();
}

function disegnaPenrose() {
  background(240, 230, 218);
  stroke(79, 104, 21);
  strokeWeight(1);
  noFill();

  var posX = 0, posY = 0, angle = 0;
  var stack = [];
  var minX = 0, maxX = 0, minY = 0, maxY = 0;

  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    
    if (current === "M" || current === "N" || current === "O" || current === "P") {
      posX += side * cos(angle);
      posY += side * sin(angle);
      if (posX < minX) minX = posX;
      if (posX > maxX) maxX = posX;
      if (posY < minY) minY = posY;
      if (posY > maxY) maxY = posY;
    } else if (current === "+") {
      angle += 36;
    } else if (current === "-") {
      angle -= 36;
    } else if (current === "[") {
      stack.push({x: posX, y: posY, a: angle});
    } else if (current === "]") {
      var state = stack.pop();
      posX = state.x;
      posY = state.y;
      angle = state.a;
    }
  }

  var disegnoWidth = maxX - minX;
  var disegnoHeight = maxY - minY;

  if (disegnoWidth === 0) disegnoWidth = 1;
  if (disegnoHeight === 0) disegnoHeight = 1;

  var margine = 20;
  var maxDisponibile = width - (margine * 2);
  
  var scalaX = maxDisponibile / disegnoWidth;
  var scalaY = maxDisponibile / disegnoHeight;
  var fattoreScala = min(scalaX, scalaY);

  if (fattoreScala > 1) fattoreScala = 1;

  var xInizio = (width - (disegnoWidth * fattoreScala)) / 2 - (minX * fattoreScala);
  var yInizio = (height - (disegnoHeight * fattoreScala)) / 2 - (minY * fattoreScala);

  push();
  translate(xInizio, yInizio); 
  scale(fattoreScala);
  
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    
    if (current === "M" || current === "N" || current === "O" || current === "P") {
      line(0, 0, side, 0);
      translate(side, 0);
    } else if (current === "+") {
      rotate(36);
    } else if (current === "-") {
      rotate(-36);
    } else if (current === "[") {
      push();
    } else if (current === "]") {
      pop();
    }
  }
  
  pop(); 
}

function draw() {
}