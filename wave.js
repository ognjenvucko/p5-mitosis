function Wave(p, pos) {

  var MAX_WAVE_RADIUS = 650;
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

  this.contains = function(cell) {
    var dist = this.p5.dist(this.pos.x, this.pos.y, cell.pos.x, cell.pos.y);
    return dist < this.radius / 2 - cell.radius / 2;
  }

  this.show = function() {
    this.p5.fill(220, 10);
    this.p5.ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }
}
