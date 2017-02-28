var cells = [];
var waves = [];

var WINDOW_MARGIN = 20;
var WAVE_FORCE_MAGNITUDE = 0.5;
var NUMBER_OF_CELLS = 15;

var sketch = function(p) {

	p.setup = () => {
		p.createCanvas(p.windowWidth - WINDOW_MARGIN, p.windowHeight - WINDOW_MARGIN);
		for (var i = 0; i < NUMBER_OF_CELLS; i++) {
			var cellColor = p.color(p.random(150, 240), p.random(150, 240), p.random(150, 240), 200);
			cells.push(new Cell(p, p.createVector(p.random(p.width), p.random(p.height)), 50, cellColor));
		}
	}

	p.draw = () => {
		p.noStroke();
		p.background(p.color(50, 52, 60));

		cells.filter(function(cell) {
			return cell.active;
		}).forEach(function(cell) {

			// handle merges
			cells.filter(function(other) {
				return other.active && other != cell;
			}).forEach(function(other) {
				if (other.overlap(cell)) {
					other.merge(cell);
				}
			});

			// apply wave force to cells
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

	}

	p.mouseClicked = () => {

		var clickedInsideCell = false;

		cells.filter(function(cell) {
			return cell.active && cell.contains(p.createVector(p.mouseX, p.mouseY));
		}).forEach(function(cell) {
			clickedInsideCell = true;
			// split to two cells
			cell.mitosis().forEach(function(newCell) {
				cells.push(newCell);
			});
		});

		if (!clickedInsideCell) {
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
