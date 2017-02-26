var cells = [];
var waves = [];

var NUMBER_OF_CELLS = 30;
var WINDOW_MARGIN = 20;

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

		cells.map(function(cell) {
			cell.update();
			cell.show();
		});

		waves.filter(function(wave) {
			return wave.alive;
		}).map(function(wave) {
			wave.update();
			wave.show();
		});

		this.shouldDo(0.003, function() {
			cells.push(new Cell(p));
		});
	}

	p.mouseClicked = function() {

		var mitosisOccurred = false;

		cells.filter(function(cell) {
			return cell.ifInside(p.mouseX, p.mouseY);
		}).map(function(cell) {
			mitosisOccurred = true;
			cells.push(cell.mitosis());
		});

		if (!mitosisOccurred) {
			waves.push(new Wave(p, p.createVector(p.mouseX, p.mouseY)));
		}

	}

	this.shouldDo = function(probability, callback) {
		if (p.random() < probability) {
			callback();
		}
	}
}

var app = new p5(sketch);
