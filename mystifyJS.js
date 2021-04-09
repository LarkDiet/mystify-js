//Recreation of XP Mystify screensaver as a web app

let vectors = [];
let targets = [];
let speed = 5;
let polyColor;
let isInit;
let poly1;
let poly2;

/*The first thing we need are four vector points
that we can connect and easily manipulate to
bounce across the screen (like a DVD logo)
Classes are not hoisted so we put them first */

class Poly {

  constructor(polyColor) {
    this.polyColor = polyColor;
    let iv = [];
    for (let i = 0; i < 4; i++) {
      iv.push(new p5.Vector(random(1, width), random(1, height)));
    }
    this.vectors = iv;
    this.targets = [];
  }
  
  colorPhase() {
    let h = hue(this.polyColor);
    if (h == 255) {
      h = 0;
    } else {
      h += 0.1;
    }
    this.polyColor = color(h, 255, 255);
  }
  
  render() {
    stroke(this.polyColor);
    for (let i = 0; i < this.vectors.length; i++) {
      if (i == this.vectors.length - 1) {
        line(this.vectors[i].x, this.vectors[i].y, this.vectors[0].x, this.vectors[0].y);
      } else {
        line(this.vectors[i].x, this.vectors[i].y, this.vectors[i+1].x, this.vectors[i+1].y);
      }
    }
  }
  
  update() {
    //The first time this is called, we calculate a random angle/speed for each vector to move in
    if (isInit) {
      for (let i = 0; i < this.vectors.length; i++) {
        this.targets.push(p5.Vector.random2D().mult(speed));
      }
    }
    for (let i = 0; i < this.vectors.length; i++) {
      this.vectors[i] = this.vectors[i].add(this.targets[i]);
      //If it hits the canvas bounds, reflect off that axis
      if (this.vectors[i].x < 0 || this.vectors[i].x > width) {
        this.targets[i].x *= -1;
      }
      if (this.vectors[i].y < 0 || this.vectors[i].y > height) {
        this.targets[i].y *= -1;
      }
    }
    this.colorPhase();
    this.render();
  }
  
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);
  poly1 = new Poly(color(0, 255, 255));
  poly2 = new Poly(color(100, 255, 255));
  isInit = true;
}


function draw() {
  if (isInit) {background(0);}
  background(0, 10);
  poly1.update();
  poly2.update();
  isInit = false;
}


/*function initVectors() {
  let v1 = createVector(width/4, height/4);
  let v2 = createVector(width*0.75, height/4);
  let v3 = createVector(width*0.75, height*0.75);
  let v4 = createVector(width/4, height*0.75);
  vectors = [v1, v2, v3, v4];
  
  for (i = 0; i < 4; i++) {
    poly2.push(new p5.Vector(random(1, width), random(1, height)));
  }
}


function update() {
  if (isInit) {
    for (i = 0; i < vectors.length; i++) {
      targets.push(p5.Vector.random2D().mult(speed));
    }
    
    for (i = 0; i < poly2.length; i++) {
      targets2.push(p5.Vector.random2D().mult(speed));
    }
    isInit = false;
  }
  for (i = 0; i < vectors.length; i++) {
    vectors[i] = vectors[i].add(targets[i]);
    if (vectors[i].x < 0 || vectors[i].x > width) {
      targets[i].x *= -1;
    }
    if (vectors[i].y < 0 || vectors[i].y > height) {
      targets[i].y *= -1;
    }
  }
  
  for (i = 0; i < poly2.length; i++) {
    poly2[i] = poly2[i].add(targets2[i]);
    if (poly2[i].x < 0 || poly2[i].x > width) {
      targets2[i].x *= -1;
    }
    if (poly2[i].y < 0 || poly2[i].y > height) {
      targets2[i].y *= -1;
    }
  }
  
  colorPhase();
}

function render() {
  for (i = 0; i < vectors.length; i++) {
    if (i == vectors.length - 1) {
      line(vectors[i].x, vectors[i].y, vectors[0].x, vectors[0].y);
    } else {
      line(vectors[i].x, vectors[i].y, vectors[i+1].x, vectors[i+1].y);
    }
  }
  
  for (i = 0; i < poly2.length; i++) {
    if (i == poly2.length - 1) {
      line(poly2[i].x, poly2[i].y, poly2[0].x, poly2[0].y);
    } else {
      line(poly2[i].x, poly2[i].y, poly2[i+1].x, poly2[i+1].y);
    }
  }
}

function colorPhase() {
  let h = hue(polyColor);
  if (h == 255) {
    h = 0;
  } else {
    h += 0.1;
  }
  polyColor = color(h, 255, 255);
} */
