/*
 * A simple class to contain some maze information
 */
var Maze = Class.create({
	initialize: function(div_id, width, height) {
		// Actually start initializing defaults etc.
		this.div_id = div_id || "maze";
		this.width = width || 50;
		this.height = height || 50;

		// Some derived
		this.ticks = 0;
		this.scale = 5;
		this.stack = new Hash();

		// Start and end
		this.start_x = 0;
		this.start_y = 0;
		this.end_x = 49;
		this.end_y = 0;

		// Build up our canvas
		this.canvas = document.createElement("canvas");
		this.canvas.id = this.div_id + "_canvas";
		this.canvas.width  = this.width * this.scale;
		this.canvas.height = this.height * this.scale;

		// Push the canvas into our main div
		$(this.div_id).update(this.canvas);

		// Get our context for convenience
		this.ctx = this.canvas.getContext("2d");

		// Initialize our maze
		this.initMaze();

		// Draw walls - cheap hack for now
		for (var i = 0; i < 35; ++i) {
			this.maze[10][i] = -1;
			this.maze[25][i] = -1;
			this.maze[40][i] = -1;
		} // for i
		for (var i = 10; i < 50; ++i) {
			this.maze[17][i] = -1;
			this.maze[33][i] = -1;
		} // for i

		// Start it ticking
		this.stack.set(this.start_x + "," + this.start_y, 1);
		this.tick();
	}, // initialize
	initMaze: function() {
		this.maze = new Array();
		for (var i = 0; i < this.width; ++i) {
			this.maze[i] = new Array();
			for (var j = 0; j < this.height; ++j) {
				this.maze[i][j] = 0;
			}
		}
	}, // initMaze
	tick: function() {
		// Set up a new stack
		this.newstack = new Hash();
		// Process our stack
		this.stack.each(function(pair) {
			// Get out our index
			var index = pair.key.split(",");
			var x = index[0];
			var y = index[1];
			var newval = pair.value + 1;
			// Sanity check
			if (x < 0 || x >= this.width)  return;
			if (y < 0 || y >= this.height) return;
			if (this.maze[x][y] == -1)     return;
			// Do the increment!
			if (this.maze[x][y] == 0) this.maze[x][y] = pair.value;
			// Push the neighbors onto the new stack
			// Using a variety of ugly variables here because it wasn't quite working otherwise
			var xup = parseInt(x) + 1;
			var xdown = parseInt(x) - 1;
			var yup = parseInt(y) + 1;
			var ydown = parseInt(y) - 1;
			this.newstack.set(xup+","+y, newval);
			this.newstack.set(xdown+","+y, newval);
			this.newstack.set(x+","+yup, newval);
			this.newstack.set(x+","+ydown, newval);
		}.bind(this));

		// Now, simply make our new stack the current stack
		this.stack = this.newstack;

		// Increment!
		this.ticks++;

		// Draw things
		this.drawMaze();

		// Check for completion
		if (this.maze[this.end_x][this.end_y] > 0) {
			// Dump out for now
			return;
		} // if maze[endx][endy] == 1
		// Set up the next pulse
		window.setTimeout(this.tick.bind(this), 10);
	}, // tick
	drawMaze: function() {
		// Save our context
		this.ctx.save();
		this.ctx.beginPath();
		for (var i = 0; i < this.width; ++i) {
			for (var j = 0; j < this.height; ++j) {
				this.ctx.fillStyle = this.getFillStyle(i,j);
				this.ctx.fillRect(i*this.scale,j*this.scale,i*this.scale+this.scale,j*this.scale+this.scale);
			}
		}
		// Reset
		this.ctx.restore();
	}, // drawMaze
	getFillStyle: function(x,y) {
		var style;
		if (x == this.start_x && y == this.start_y) {
			// Starting point: Red
			style = "rgb(255,0,0)";
		} else if (x == this.end_x && y == this.end_y) {
			// Ending point: Green
			style = "rgb(0,255,0)";
		} else if (this.maze[x][y] == 0) {
			// Empty space: White
			style = "rgb(255,255,255)";
		} else if (this.maze[x][y] == -1) {
			// Wall: Black
			style = "rgb(0,0,0)";
		} else {
			// Wavefront: Rainbow
			var col = parseInt(this.maze[x][y] / this.ticks * 255);
			//style = "rgb(" + (255-col) + "," + col + "," + ((col + 127) % 255) + ")";
			// Red to green
			style = "rgb(" + (255-col) + "," + col + ",0)";
			// Pure green
			style = "rgb(0," + col + ",0)";
			// Pure blue
			style = "rgb(0,0," + (255-col) + ")";
		}
		return style;
	}, // getFillStyle
	increment: function(x, y) {
		// Make sure we're not out of bounds
		if (x < 0 || x >= this.width)  return;
		if (y < 0 || y >= this.height) return;
		// Make sure we're a non-negative before incrementing
		if (this.maze[x][y] > -1) this.maze[x][y]++;
	} // increment
});
