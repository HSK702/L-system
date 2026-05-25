var axiom = "F"; 
var sentence = axiom;

var generation = 0; 
var currentLen; 

var rule = {
  a: "F",
  b: "F[-F]F[-F]+FF" 
};

function setup() {
  createCanvas(600, 600); 
  angleMode(DEGREES); 

  createP("Assioma (#0): " + axiom);
  
  var buttonGen = createButton("generate");
  buttonGen.mousePressed(generate); 
  buttonGen.style('font-size', '18px');   
  buttonGen.style('padding', '10px 20px'); 
  buttonGen.style('margin-right', '10px'); 
  buttonGen.style('color', 'rgb(79, 104, 21)');
  buttonGen.style('border-radius', '12px'); 
  buttonGen.style('border', '1px solid rgb(79, 104, 21)'); 
  var buttonReset = createButton("reset");
  buttonReset.mousePressed(resetLSystem); 
  buttonReset.style('font-size', '18px');   
  buttonReset.style('padding', '10px 20px'); 
  
  disegnaTurtle();
}

function generate() {
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
  sentence = axiom;
  generation = 0;
  disegnaTurtle();
}

function disegnaTurtle() {
  background(245); 
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
  stroke(50);        
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