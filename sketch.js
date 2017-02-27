var cells = [];
var waves = [];

var NUMBER_OF_CELLS = 15;
var WINDOW_MARGIN = 20;
var WAVE_FORCE_MAGNITUDE = 0.5;

var sketch = function(p) {

	p.setup = function() {
		p.createCanvas(p.windowWidth - WINDOW_MARGIN, p.windowHeight - WINDOW_MARGIN);

		for (var i = 0; i < NUMBER_OF_CELLS; i++) {
			cells.push(new Cell(p));
		}

	}

	p.draw = function() {
		p.noStroke()
		p.background(50);

		cells.filter(function(cell) {
			return cell.active;
		}).forEach(function(cell) {
			waves.filter(function(wave) {
				return wave.alive && wave.contains(cell);
			}).forEach(function(wave) {
				cell.applyForce(cell.pos.copy().sub(wave.pos).setMag(WAVE_FORCE_MAGNITUDE));
			});
			cell.update();
			cell.show();
		});

		waves.filter(function(wave) {
			return wave.alive;
		}).forEach(function(wave) {
			wave.update();
			wave.show();
		});

		shouldDo(0.003, function() {
			cells.push(new Cell(p));
		});
	}

	p.mouseClicked = function() {

		var mitosisOccurred = false;

		cells.filter(function(cell) {
			return cell.ifInside(p.mouseX, p.mouseY);
		}).forEach(function(cell) {
			mitosisOccurred = true;
			cells.push(cell.mitosis());
		});

		if (!mitosisOccurred) {
			waves.push(new Wave(p, p.createVector(p.mouseX, p.mouseY)));
		}

	}

}

function shouldDo(probability, callback) {
	if (Math.random() < probability) {
		callback();
	}
}

var app = new p5(sketch);
