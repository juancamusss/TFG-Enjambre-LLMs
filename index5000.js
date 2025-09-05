// index.js

const N = 5000;
let particles = [];

const sketch = (q) => {
  class Particle {
    constructor(x, y) {
      this.pos = q.createVector(x, y);
      this.vel = q.createVector(q.random(-2, 2), q.random(-2, 2));
      this.acc = q.createVector(0, 0);
    }

    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);

      // Limites de pantalla: wrap-around
      if (this.pos.x < 0) this.pos.x = q.width;
      if (this.pos.x > q.width) this.pos.x = 0;
      if (this.pos.y < 0) this.pos.y = q.height;
      if (this.pos.y > q.height) this.pos.y = 0;
    }

    applyForce(force) {
      this.acc.add(force);
    }

    show() {
      q.fill(50, 150, 255);
      q.noStroke();
      q.circle(this.pos.x, this.pos.y, 10);
    }
  }

  q.setup = () => {
    const canvas1 = q.createCanvas(1500, 700);
    canvas1.parent('canvas-container');
    
    canvas1.style.borderRadius = "12px";
    canvas1.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.3)";
    
    // Crear partículas
    for (let i = 0; i < N; i++) {
      particles.push(new Particle(q.random(q.width), q.random(q.height)));
    }
  };

  q.draw = () => {
    q.background(240);

    for (let p of particles) {
      p.update();
      p.show();
    }
  };
};

// Crear instancia de q5
new Q5(sketch);
