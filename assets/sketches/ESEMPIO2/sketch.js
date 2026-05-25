var axiom = "FG"; 
var sentence = axiom;
var len = 140; 

var rule1 = {
  a: "F",
  b: "F-G" 
};

var rule2 = {
  a: "G",
  b: "F+G"    
};

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES); 

  // Bottone Generate
  var buttonGen = createButton("generate");
  buttonGen.mousePressed(generate); 
  buttonGen.style('font-size', '18px');   
  buttonGen.style('padding', '10px 20px'); 
  buttonGen.style('margin-right', '10px'); 
  buttonGen.style('color', 'rgb(79, 104, 21)');
  buttonGen.style('border-radius', '12px'); 
  buttonGen.style('border', '1px solid rgb(79, 104, 21)'); 

  // Bottone Reset
  var buttonReset = createButton("reset");
  buttonReset.mousePressed(resetLSystem); 
  buttonReset.style('font-size', '18px');   
  buttonReset.style('padding', '10px 20px'); 
  buttonReset.style('color', 'rgb(79, 104, 21)');
  buttonReset.style('border-radius', '12px'); 
  buttonReset.style('border', '1px solid rgb(79, 104, 21)'); 
  
  disegnaTurtle();
}

function generate() {
  len *= 0.707; 

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
  sentence = axiom;
  len = 140; 
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
  
  // Colore della figura verde
  stroke(79, 104, 21);       
  strokeWeight(2);  
  
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