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

var container;

function setup() {
  container = createDiv();
  container.style('position', 'relative');
  container.style('width', '340px');
  container.style('height', '340px');
  container.style('border', '2px solid rgb(79, 104, 21)');
  container.style('border-radius', '12px');
  container.style('overflow', 'hidden');

  var canvas = createCanvas(340, 340);
  canvas.parent(container);
  angleMode(DEGREES);
  
  side = 20;

  var gui = createDiv();
  gui.style('margin-top', '20px');
  gui.style('font-family', 'sans-serif');
  gui.style('color', 'rgb(79, 104, 21)');

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

  createRuleInput("M → ", rules["M"], rulesContainer, function() { rules["M"] = this.value(); });
  createRuleInput("N → ", rules["N"], rulesContainer, function() { rules["N"] = this.value(); });
  createRuleInput("O → ", rules["O"], rulesContainer, function() { rules["O"] = this.value(); });
  createRuleInput("P → ", rules["P"], rulesContainer, function() { rules["P"] = this.value(); });

  disegnaPenrose();
}

function createRuleInput(labelText, defaultValue, parentContainer, inputEvent) {
  var row = createDiv();
  row.parent(parentContainer);
  row.style('display', 'flex');
  row.style('align-items', 'center');
  row.style('gap', '8px');

  var label = createSpan(labelText);
  label.parent(row);
  label.style('font-weight', 'bold');
  label.style('font-size', '14px');
  label.style('min-width', '35px'); // Ridotto per adattarsi alla sola lettera con freccia
  
  var inp = createInput(defaultValue);
  inp.parent(row);
  inp.input(inputEvent);
  inp.input(function() {
    this.style('width', Math.max(100, this.value().length * 8) + 'px');
  });
  
  inp.style('padding', '6px');
  inp.style('border', '1px solid rgb(79, 104, 21)');
  inp.style('border-radius', '6px');
  inp.style('background-color', 'rgb(240, 230, 218)');
  inp.style('color', 'rgb(79, 104, 21)');
  inp.style('font-family', 'monospace');
  inp.style('font-size', '13px');
  
  inp.style('width', Math.max(100, defaultValue.length * 8) + 'px');
}

function styleButton(btn) {
  btn.style('padding', '8px 16px');
  btn.style('font-size', '16px');
  btn.style('cursor', 'pointer');
  btn.style('background-color', 'rgb(79, 104, 21)');
  btn.style('color', 'rgb(240, 230, 218)');
  btn.style('border', '1.5px solid rgb(79, 104, 21)');
  btn.style('border-radius', '10px');
  btn.style('text-transform', 'lowercase');
}

function resetCanvas() {
  sentence = axiom;
  count = 0;
  side = 20;
  disegnaPenrose();
}

function generate() {
  if (count >= 5) return; 
  
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