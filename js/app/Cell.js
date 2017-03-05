define(() => {
  return function Cell(p5, pos, radius, color, velocity) {

    this.p5 = p5;
    this.pos = pos;
    this.radius = radius;
    this.color = color;
    this.force = p5.createVector();

    this.vel = velocity || p5.createVector();

    this.active = true;

    this.update = () => {
      var randomVect = this.p5.createVector(this.p5.random(-1, 1), this.p5.random(-1, 1));
      randomVect.setMag(1);
      this.vel.add(randomVect);
      this.pos.add(this.vel.add(this.force));
      this.vel.sub(randomVect);
      if (this.pos.x < 0 + this.radius) {
        this.pos.x = this.radius;
        this.vel.x = -1 * this.vel.x;
      }
      if (this.pos.x > this.p5.width - this.radius) {
        this.pos.x = this.p5.width - this.radius;
        this.vel.x = -1 * this.vel.x;
      }
      if (this.pos.y < 0 + this.radius) {
        this.pos.y = this.radius;
        this.vel.y = -1 * this.vel.y;
      }
      if (this.pos.y > this.p5.height - this.radius) {
        this.pos.y = this.p5.height - this.radius;
        this.vel.y = -1 * this.vel.y;
      }
      this.force.mult(0);
      // this.vel.mult(0.998);
    }

    this.applyForce = function(force) {
      this.force.add(force);
    }

    this.show = () => {
      this.p5.fill(this.color);
      this.p5.ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }

    this.contains = function(point) {
      var dist = this.p5.dist(this.pos.x, this.pos.y, point.x, point.y);
      return dist < this.radius;
    }

    this.overlap = function(other) {
      return this.pos.dist(other.pos) < 0.75 * (this.radius + other.radius);
    }

    this.merge = function(other) {
      other.active = false;
      if (this.radius < other.radius) {
        this.pos = other.pos;
      }
      var radiusSum = this.radius + other.radius;
      this.vel = this.vel.mult(this.radius / radiusSum).add(other.vel.mult(this.radius / radiusSum));
      this.radius = this.p5.sqrt(this.radius * this.radius + other.radius * other.radius);
    }

    this.mitosis = () => {

      if (!this.active) return [];
      this.active = false;

      var newRadius = this.radius / this.p5.sqrt(2);

      this.radius = newRadius;

      var randomX = this.p5.random(-1, 1);
      var randomY = this.p5.random(-1, 1);

      var positionVector = this.p5.createVector(randomX, randomY).setMag(0.8 * this.radius);

      var firstCellPos = this.pos.copy().sub(positionVector);
      var secondCellPos = this.pos.copy().add(positionVector);

      var vel = positionVector.setMag(1);
      return [
        new Cell(this.p5, firstCellPos, newRadius, this.color, vel.copy().mult(-1).add(this.vel)),
        new Cell(this.p5, secondCellPos, newRadius, this.color, vel.copy().add(this.vel)),
      ];

    }

  }

});
