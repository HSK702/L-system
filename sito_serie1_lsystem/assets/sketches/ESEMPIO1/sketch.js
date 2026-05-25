var axiom = "FG"; 
var sentence = axiom;
var len = 80;    

var rule1 = {
  a: "F",
  b: "F+F-G" 
};

var rule2 = {
  a: "G",
  b: "-GG"    
};

function setup() {
  createCanvas(600, 500);
  angleMode(DEGREES); 
  
  createP("Assioma (#0): " + axiom);
  var button = createButton("generate");
  button.mousePressed(generate); 
  
  disegnaTurtle();
}

function generate() {
  len *= 0.6; 

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
  createP("Stringa generata: " + sentence);
  
  disegnaTurtle();
}

function disegnaTurtle() {
  background(255); 
  resetMatrix();

  translate(width * 0.2, height * 0.6); 
  
  stroke(50);        
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
  // Gestito dagli eventi
  
}