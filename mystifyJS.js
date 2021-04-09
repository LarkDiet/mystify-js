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
