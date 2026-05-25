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

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  
  side = 20;

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
  
  disegnaPenrose();
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
  background(255);
  stroke(0);
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

  var xInizio = (width - disegnoWidth) / 2 - minX;
  var yInizio = (height - disegnoHeight) / 2 - minY;

  push();
  translate(xInizio, yInizio); 
  
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
