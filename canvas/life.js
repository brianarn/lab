/*
 * Game of Life
 * by Brian Arnold
 * Copyright 2008, All Rights Reserved
 *
 * Created: 19 June 2008
 * Last Modified: 30 June 2008
 *
 * Version History:
 * 0.3 - Doing what I can to clean up, lean less on existing HTML in the page
 * 0.2 - 20 June 2008 - removed "name" requirement, figured out how to bind
 * properly for a cleaner setTimeout, tried to find/kill some mem leaks.
 * Memory usage in Safari is perfectly stable.
 * 0.1 - 19 June 2008 - Stable, but feels kind of hack-ish. Think it's leaking bad.
 *
 * A simple class to draw a game of life
 */
var Life = Class.create({
	initialize: function(div_id, gridcount, gridsize, living, ticktime) {
		// Actually start initializing defaults etc.
		this.div_id = div_id || "game";
		this.gridcount = gridcount || 10;
		this.gridsize = gridsize || 50;
		this.living = living || 30;
		this.ticktime = ticktime || 250;

		// Determine derived values
		this.canvaswidth = this.gridcount * this.gridsize;
		this.ticks = 0;
		this.lastchanges = this.gridcount * this.gridcount;

		// Build up our canvas
		this.canvas = document.createElement("canvas");
		this.canvas.id = this.div_id + "_canvas";
		this.canvas.width  = this.canvaswidth + 1;
		this.canvas.height = this.canvaswidth + 1;
		// Push the canvas into our main div
		$(this.div_id).update(this.canvas);

		// Add display
		this.display = $(document.createElement("div"));
		this.display.id = this.div_id + "_display";
		this.display.update('<div>Tick: <span id="tickcount">0</span></div>');
		this.display.insert('<div>Changes in past tick: <span id="changecount">Initial set</span></div>');
		$(this.div_id).insert(this.display);
		this.ctx = this.canvas.getContext("2d");

		// Initialize our grid values
		this.initGrid();
		
		// Draw the grid
		this.redraw();
	}, // initialize
	initGrid: function() {
		this.grid = new Array(this.gridcount);
		for (var i=0; i < this.gridcount; ++i) {
			this.grid[i] = new Array(this.gridcount);
			for (var j=0; j < this.gridcount; ++j) {
				// Initializing arrays
				var value = Math.floor(Math.random() * 100);
				if (value < this.living) {
					this.grid[i][j] = 1;
				} else {
					this.grid[i][j] = 0;
				}
			} // for j
		} // for i
	}, // initGrid
	redraw: function() {
		// Clear the grid
		this.clearGrid();
		// Re-draw the grid portion
		this.drawGrid();
		// Fill it in
		this.drawDots();
	}, // redraw
	clearGrid: function() {
		// Simply draw a white rectangle over the whole thing
		// I could have gone for clear, but I prefer the specificity of a solid white square
		// over transparency
		this.ctx.save();
		this.ctx.beginPath();
		//this.ctx.fillStyle = "rgba(255,255,255,0.05)";
		this.ctx.fillStyle = "rgb(255,255,255)";
		this.ctx.fillRect(0,0,this.canvaswidth+1, this.canvaswidth+1);
		this.ctx.restore();
	}, // clearGrid
	drawGrid: function() {
		// Special case: Do not draw the grid if we have a grid size of less than 3
		if (this.gridsize < 3) return;
		// Draw some grids!
		this.ctx.save();
		this.ctx.strokeStyle = "rgb(0,0,0)";
		for (var i=0; i < this.gridcount; ++i) {
			for (var j=0; j < this.gridcount; ++j) {
				// Drawing the grid boxes
				// Do some scaling - the extra .5 is to help with line cleanliness
				var rel_i = i * this.gridsize + 0.5;
				var rel_j = j * this.gridsize + 0.5;
				this.ctx.strokeRect(rel_i, rel_j, this.gridsize, this.gridsize);
			} // for j
		} // for i
		this.ctx.restore();
	}, // drawGrid
	drawDot: function(x,y,render) {
		// Draw an individual dot
		// Default values:
		//render = render || this.grid[x][y];
		render = (render == null) ? this.grid[x][y] : render;
		// Do some scaling - the extra .5 is to help with line cleanliness
		var radius = this.gridsize * 2 / 5;
		var center_shift = this.gridsize / 2;
		var rel_x = x * this.gridsize + center_shift + 0.5;
		var rel_y = y * this.gridsize + center_shift + 0.5;
		var mark;
		mark = 0.02;
		mark = 1.0;

		// Start up a new path for our drawing, saving to be safe
		this.ctx.save();
		this.ctx.beginPath();
		// Set our fillStyle based on render status
		if (render) {
			this.ctx.fillStyle = "rgba(0,0,0,"+mark+")";
			// Special case - draw a box if our gridsize is less than three, otherwise draw circle
			if (this.gridsize < 3) {
				this.ctx.fillRect(x * this.gridsize, y * this.gridsize, this.gridsize, this.gridsize);
			} else {
				// Draw the main circle
				this.ctx.arc(rel_x, rel_y, radius, 0, Math.PI*2, true);
				this.ctx.fill();
				// Start drawing the highlight
				// Turned off for now
				//this.ctx.globalAlpha = 0.2;
				//this.ctx.fillStyle = "#FFF";
				//for (var k = 0.1; k < 0.5; k += 0.01) {
				//	this.ctx.beginPath();
				//	this.ctx.arc(rel_x - (1 - k), rel_y - (1 - k), radius * (1 - (4 * k)), 0, Math.PI*2, true);
				//	this.ctx.fill();
				//} // for k
			}
		} else {
			// Draw a white rectangle to clean it up
			// - would have used another circle but it left a ghosted halo
			this.ctx.fillStyle = "rgba(255,255,255,"+mark+")";
			// Special case: If our gridsize is less than three, no compensation for border
			if (this.gridsize < 3) {
				this.ctx.fillRect(x * this.gridsize, y * this.gridsize, this.gridsize, this.gridsize);
			} else {
				this.ctx.fillRect(x * this.gridsize + 1, y * this.gridsize + 1, this.gridsize - 1, this.gridsize - 1);
			}
		} // grid check
		this.ctx.restore();
	}, // drawDot
	drawDots: function() {
		// Draw ever dot -- useful in doing a full redraw
		for (var i=0; i < this.gridcount; ++i) {
			for (var j=0; j < this.gridcount; ++j) {
				this.drawDot(i,j);
			} // for j
		} // for i
	}, // drawDots
	tick: function() {
		// Count our changes
		var changes = 0;
		// Build a new grid based on the rules of life
		var newGrid = new Array();
		for (var i=0; i < this.gridcount; ++i) {
			newGrid[i] = new Array();
			for (var j=0; j < this.gridcount; ++j) {
				// Get our living state and our count of living neighbors
				// I could just check this.grid but I made an isAlive function, should use it
				var livingstate = this.isAlive(i,j);
				var livingneighbors = this.countLivingNeighbors(i,j);
				if (livingstate) {
					// Conditions when cell is alive:
					// 1. If I have less than 2 living neighbors, I die.
					// 2. If I have more than three living neighbors, I die.
					// Default: I keep on living.
					if (livingneighbors < 2 || livingneighbors > 3) {
						livingstate = 0;
						++changes;
						this.drawDot(i,j,livingstate);
					}
				} else {
					// Conditions when cell is dead:
					// 1. If I have three neighbors, I come to life.
					// Default: Still dead.
					if (livingneighbors == 3) {
						livingstate = 1;
						++changes;
						this.drawDot(i,j,livingstate);
					}
				} // live/dead check
				// Set our state
				newGrid[i][j] = livingstate;
			} // for j
		} // for i
		// Assign it over
		this.grid = newGrid;
		// Count up our step
		++this.ticks;
		// Update the tick display
		$("tickcount").update(this.ticks);
		$("changecount").update(changes);
		if (changes > 0) {
			// If we happen to have the same changes as last time, say something
			if (this.lastchanges == changes) $("changecount").insert(" - same as last tick, oscillating?");
			// Start up a timer
			//if (this.ticks < 10) window.setTimeout(this.tick.bind(this), this.ticktime);
			window.setTimeout(this.tick.bind(this), this.ticktime);
		} else {
			// No changes - fully stable system.
			$("changecount").insert(" - system completely stabilized.");
		}
		// Update change count
		this.lastchanges = changes;
	}, // tick
	isAlive: function(x,y) {
		// Normalize our x and y values, to achieve a toroidal effect
		x = (x + this.gridcount) % this.gridcount;
		y = (y + this.gridcount) % this.gridcount;
		// Hand back the value of cell, which effectively works like a boolean
		return this.grid[x][y];
	}, // isAlive
	isDead: function(x,y) {
		// Simply the inverse of isAlive
		return !this.isAlive(x,y);
	}, // isDead
	countLivingNeighbors: function(x,y) {
		// Perform a count of our neighbors
		var neighborcount = 0;
		for (var i = x - 1; i <= x+1; ++i) {
			for (var j = y - 1; j <= y+1; ++j) {
				// First, skip the center case
				if (i == x && j == y) continue;
				// Now, just get our alive state
				neighborcount += this.isAlive(i,j);
			}
		}
		// Hand back our count
		return neighborcount;
	}, // countLivingNeighbors
	// Message functions
	group: function(text) {
		// Pass along to Firebug
		if (window.console && console.firebug) {
			console.group(text);
		}
	}, // group
	groupEnd: function(text) {
		// Pass along to Firebug
		if (window.console && console.firebug) {
			console.groupEnd();
		}
	}, // groupEnd
	log: function(text) {
		// Pass along to Firebug
		if (window.console && console.firebug) {
			console.log(text);
		}
	} // log
});
