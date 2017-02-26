function Wave(p, pos) {

  var MAX_WAVE_RADIUS = 350;
  var START_RADIUS = 10;
  var WAVE_SPEED = 2;

  this.pos = pos;
  this.radius = START_RADIUS;
  this.speed = WAVE_SPEED;
  this.p5 = p;
  this.alive = true;

  this.update = function() {
    if (this.radius < MAX_WAVE_RADIUS) {
      this.radius += this.speed;
    } else {
      this.alive = false;
    }
  }

  this.show = function() {
    this.p5.noFill();
    this.p5.strokeWeight(2);
    this.p5.stroke(180, 100);
    this.p5.ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }
}
