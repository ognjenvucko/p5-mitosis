var MAX_RADIUS = 70;

function Cell(p, pos, radius, color) {

  this.pos = pos || p.createVector(p.random(p.width), p.random(p.height));
  this.radius = radius || p.random(10, MAX_RADIUS);
  this.p5 = p;
  this.delta = p.random(1, 3);
  this.color = color || p.color(p.random(120, 255), p.random(120, 255), p.random(120, 255), 200);

  this.update = function() {
    var newX = this.p5.random(-this.delta, this.delta);
    var newY = this.p5.random(-this.delta, this.delta);
    this.pos.add(this.p5.createVector(newX, newY));
    if (this.radius > MAX_RADIUS && this.p5.random() < 0.3) {
      this.radius--;
    }
  }

  this.show = function() {
    this.p5.fill(this.color);
    this.p5.ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }

  this.ifInside = function(mouseX, mouseY) {
    var dist = this.p5.dist(this.pos.x, this.pos.y, mouseX, mouseY);
    return dist < this.radius / 2;
  }

  this.mitosis = function() {
    var newRadius = this.p5.sqrt(this.radius * this.radius / 2);
    this.radius = newRadius;
    var oldX = this.pos.x;
    var delta = this.radius / 2 + 5;
    this.pos = this.p5.createVector(oldX - delta, this.pos.y);
    return new Cell(this.p5, this.p5.createVector(oldX + delta, this.pos.y), newRadius, this.color);
  }

}
