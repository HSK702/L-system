var axiom = "F";
var sentence = axiom;

var rule1 = {
  a: "F",
  b: "F+F-G"
};

var rule2 = {
  a: "G",
  b: "GG"
};

function generate() {
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
  createP(sentence);
}

function setup() {
  noCanvas();
  createP(axiom);
  var button = createButton("generate");
  button.mousePressed(generate); 
}

function draw() {
}