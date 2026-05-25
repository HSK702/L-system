var axiom = "F"; 
var sentence = axiom;

var generation = 0; 
var currentLen; 

var rules = {
  "F": "G[-F]G[-F]+GF",
  "G": "GG"
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
  inputRule1 = createInput(rules["F"]);
  styleInput(inputRule1);
  inputRule1.input(function() {
    rules["F"] = this.value();
    aggiornaLarghezzaInput(this);
  });
  inputRule1.parent(regoleGui);

  var spazio = createSpan("&nbsp;&nbsp;&nbsp;");
  spazio.parent(regoleGui);

  regoleGui.child(createSpan("G → "));
  inputRule2 = createInput(rules["G"]);
  styleInput(inputRule2);
  inputRule2.input(function() {
    rules["G"] = this.value();
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
  if (generation > 5) return; 
  
  rules["F"] = inputRule1.value();
  rules["G"] = inputRule2.value();

  generation++; 

  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    
    if (current === "F") {
      nextSentence += rules["F"];
    } else if (current === "G") {
      nextSentence += rules["G"];
    } else {
      nextSentence += current;
    }
  }
  
  sentence = nextSentence; 
  disegnaTurtle();
}

function resetLSystem() {
  rules["F"] = inputRule1.value();
  rules["G"] = inputRule2.value();

  sentence = axiom;
  generation = 0; 
  disegnaTurtle();
}

function disegnaTurtle() {
  background(240, 230, 218); 
  resetMatrix();

  var baseLen = 120; 
  currentLen = baseLen * pow(0.5, generation); 

  translate(width / 2, height * 0.98); 
  rotate(-90); 
  
  var pesoTratto = max(0.5, 3.5 - generation * 0.55);
  stroke(79, 104, 21);        
  strokeWeight(pesoTratto); 
  
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
  
    if (current == "F" || current == "G") {
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