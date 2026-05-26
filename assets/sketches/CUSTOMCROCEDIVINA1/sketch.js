var axiom = "F+F+F+F"; 
var sentence = axiom;
var count = 0;
var side;

var rules = {
  "F": "F+F+F-F-F+F+F-F-F+F+F-F-F+F+F-F-F+F-F+F-F+F-F+F-F"
};

var mainContainer;
var leftContainer;
var rightContainer;

var inputAxiom;
var inputRuleF;

var colSfondo = '#f0e6da'; 
var colTratto  = '#4f6815'; 

function setup() {
  mainContainer = createDiv();
  mainContainer.style('display', 'flex');
  mainContainer.style('flex-direction', 'row');
  mainContainer.style('gap', '30px');
  mainContainer.style('align-items', 'flex-start');
  mainContainer.style('font-family', 'sans-serif');

  leftContainer = createDiv();
  leftContainer.parent(mainContainer);

  var canvasContainer = createDiv();
  canvasContainer.parent(leftContainer);
  canvasContainer.style('position', 'relative');
  canvasContainer.style('width', '400px');
  canvasContainer.style('height', '400px');
  canvasContainer.style('border', '2px solid ' + colTratto); 
  canvasContainer.style('border-radius', '20px'); 
  canvasContainer.style('overflow', 'hidden');
  canvasContainer.style('background-color', colSfondo);

  var canvas = createCanvas(400, 400);
  canvas.parent(canvasContainer);
  angleMode(DEGREES);
  
  side = 120; 

  var gui = createDiv();
  gui.parent(leftContainer);
  gui.style('margin-top', '20px');
  gui.style('color', colTratto); 

  var btnGen = createButton("genera");
  btnGen.parent(gui);
  btnGen.mousePressed(generate);
  styleButton(btnGen);

  var btnReset = createButton("reset");
  btnReset.parent(gui);
  btnReset.style('margin-left', '10px');
  btnReset.mousePressed(resetCanvas);
  styleButton(btnReset);
  
  var rulesContainer = createDiv();
  rulesContainer.parent(gui);
  rulesContainer.style('margin-top', '15px');
  rulesContainer.style('display', 'flex');
  rulesContainer.style('flex-direction', 'column');
  rulesContainer.style('gap', '8px');

  inputAxiom = createRuleInput("Assioma: ", axiom, rulesContainer, function(val) { 
    axiom = val.toUpperCase(); 
    resetCanvas(); 
  });

  inputRuleF = createRuleInput("F → ", rules["F"], rulesContainer, function(val) { 
    rules["F"] = val.toUpperCase(); 
    resetCanvas(); 
  });

  rightContainer = createDiv();
  rightContainer.parent(mainContainer);
  rightContainer.style('padding-top', '10px');
  rightContainer.style('color', colTratto);
  rightContainer.style('max-width', '320px');
  rightContainer.style('display', 'flex');
  rightContainer.style('flex-direction', 'column');
  rightContainer.style('gap', '15px');

  var titoloEsempio = createDiv("esempi d'uso");
  titoloEsempio.parent(rightContainer);
  titoloEsempio.style('font-weight', 'bold');
  titoloEsempio.style('font-size', '16px');
  titoloEsempio.style('text-transform', 'lowercase');
  titoloEsempio.style('margin-bottom', '-5px');

  creaBoxEsempio("1", "F+F+F+F", "F+F+F-F-F+F+F-F-F+F+F-F-F+F+F-F-F+F-F+F-F+F-F+F-F");
  creaBoxEsempio("2", "F+F+FF-FF+FF-FF+F+F+FF-FF+FF-FF", "F---F+++F-F+F");
  creaBoxEsempio("3", "F+F+F+F", "F+F+F-F-F+F+F+F-F+F-F+F-F");
  creaBoxEsempio("4", "F+F-F+F-F+F", "F---F+++F-F+F");
  creaBoxEsempio("5", "F+F+F+F", "F---F+++F-F+F");

  disegnaGeometria();
}

function creaBoxEsempio(numero, esAxiom, esRule) {
  var box = createDiv();
  box.parent(rightContainer);
  box.style('background-color', colSfondo);
  box.style('padding', '12px');
  box.style('border-radius', '12px');
  box.style('border', '1.5px solid ' + colTratto);
  box.style('font-family', 'monospace');
  box.style('font-size', '13px');
  box.style('word-break', 'break-all');
  box.style('position', 'relative');

  var rigaTitolo = createDiv("<strong>esempio " + numero + ":</strong>");
  rigaTitolo.parent(box);
  rigaTitolo.style('margin-bottom', '6px');
  rigaTitolo.style('font-family', 'sans-serif');

  var rigaAssioma = createDiv("assioma → " + esAxiom);
  rigaAssioma.parent(box);
  rigaAssioma.style('margin-bottom', '4px');

  var rigaRegola = createDiv("regola → " + esRule);
  rigaRegola.parent(box);
  rigaRegola.style('margin-bottom', '10px');

  var btnApplica = createButton("applica");
  btnApplica.parent(box);
  styleButtonPiccolo(btnApplica);
  
  btnApplica.mousePressed(function() {
    axiom = esAxiom;
    rules["F"] = esRule;
    
    inputAxiom.value(esAxiom);
    inputAxiom.style('width', Math.max(100, esAxiom.length * 8) + 'px');
    
    inputRuleF.value(esRule);
    inputRuleF.style('width', Math.max(100, esRule.length * 8) + 'px');
    
    resetCanvas();
  });
}

function createRuleInput(labelText, defaultValue, parentContainer, callbackAzione) {
  var row = createDiv();
  row.parent(parentContainer);
  row.style('display', 'flex');
  row.style('align-items', 'center');
  row.style('gap', '8px');

  var label = createSpan(labelText);
  label.parent(row);
  label.style('font-weight', 'bold');
  label.style('font-size', '14px');
  label.style('min-width', '70px'); 
  label.style('font-family', 'monospace');
  
  var inp = createInput(defaultValue);
  inp.parent(row);
  
  inp.elt.oninput = function() {
    var txt = this.value;
    inp.style('width', Math.max(100, txt.length * 8) + 'px');
    callbackAzione(txt);
  };
  
  inp.style('padding', '6px');
  inp.style('border', '1.5px solid ' + colTratto); 
  inp.style('border-radius', '6px');
  inp.style('background-color', colSfondo); 
  inp.style('color', colTratto);            
  inp.style('font-family', 'monospace'); 
  inp.style('font-size', '13px');
  inp.style('width', Math.max(100, defaultValue.length * 8) + 'px');
  
  return inp;
}

function styleButton(btn) {
  btn.style('padding', '8px 16px');
  btn.style('font-size', '16px');
  btn.style('cursor', 'pointer');
  btn.style('background-color', colTratto); 
  btn.style('color', colSfondo);             
  btn.style('border', 'none');
  btn.style('border-radius', '10px');        
  btn.style('text-transform', 'lowercase'); 
  btn.style('font-weight', '500');
  
  btn.mouseOver(function() { btn.style('opacity', '0.9'); });
  btn.mouseOut(function() { btn.style('opacity', '1.0'); });
}

function styleButtonPiccolo(btn) {
  btn.style('padding', '4px 10px');
  btn.style('font-size', '11px');
  btn.style('cursor', 'pointer');
  btn.style('background-color', colTratto); 
  btn.style('color', colSfondo);             
  btn.style('border', 'none');
  btn.style('border-radius', '6px');        
  btn.style('text-transform', 'lowercase'); 
  btn.style('font-weight', 'bold');
  btn.style('font-family', 'sans-serif');
  
  btn.mouseOver(function() { btn.style('opacity', '0.85'); });
  btn.mouseOut(function() { btn.style('opacity', '1.0'); });
}

function resetCanvas() {
  sentence = axiom;
  count = 0;
  side = 120;
  disegnaGeometria();
}

function generate() {
  if (count >= 5) return; 
  
  count++;
  side = side * 0.3333; 

  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    nextSentence += rules[current] !== undefined ? rules[current] : current;
  }
  sentence = nextSentence;
  disegnaGeometria();
}

function disegnaGeometria() {
  background(colSfondo); 
  stroke(colTratto);     
  strokeWeight(2.5);
  noFill();

  var posX = 0, posY = 0, angle = 0;
  var stack = [];
  var minX = 0, maxX = 0, minY = 0, maxY = 0;

  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    
    if (current === "F" || current === "A" || current === "B") {
      posX += side * cos(angle);
      posY += side * sin(angle);
      if (posX < minX) minX = posX;
      if (posX > maxX) maxX = posX;
      if (posY < minY) minY = posY;
      if (posY > maxY) maxY = posY;
    } else if (current === "+") {
      angle += 90; 
    } else if (current === "-") {
      angle -= 90; 
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

  var margine = 30;
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
    
    if (current === "F" || current === "A" || current === "B") {
      line(0, 0, side, 0);
      translate(side, 0);
    } else if (current === "+") {
      rotate(90); 
    } else if (current === "-") {
      rotate(-90); 
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