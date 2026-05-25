var axiom = "F"; 
var sentence = axiom;

var generation = 0; 
var currentLen; 

var rule = {
  a: "F",
  b: "G[-F]G[-F]+GF" 
};

var rule2 = {
  a: "G",
  b: "GG" 
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
  generation = 0; 
  disegnaTurtle();
}

function disegnaTurtle() {
  background(245); 
  resetMatrix();

  var baseLen = 185; 
  currentLen = baseLen * pow(0.5, generation); 

  translate(width / 2, height * 0.95); 
  rotate(-90); 
  
  var pesoTratto = max(0.5, 4.2 - generation * 0.65);
  stroke(50);        
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