/*
 * Coloration
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */

// !===== VARIABLES =====
// Our canvas
var canvas;
// Our 2D context for drawing
var ctx;

// !===== FUNCTIONS =====
// randInt: Get a random number in the range provided
function randInt(min, max) {
	return Math.floor(Math.random() * (max-min)) + min;
} // function randInt(min, max)

// drawDot: Fill in one pixel, and set the timeout for the next call
function drawDot(i,j) {
	// Safety checks
	if (i >= canvas.height) return;

	// Draw the dot
	var red, green, blue;
	red = randInt(0,255);
	green = randInt(0,255);
	blue = randInt(0,255);
	ctx.fillStyle = "rgba("+red+","+green+","+blue+",1)";
	ctx.fillRect(j,i,1,1);

	// Set up the next run
	j++;
	if (j >= canvas.width) {
		j = 0;
		i++;
	}
	setTimeout("drawDot("+i+","+j+")",0);
} // drawDot

// drawRow: Faster
function drawRow(i) {
	// Safety checks
	if (i >= canvas.height) return;

	// Draw the dot
	var red, green, blue;
	for (j = 0; j < canvas.width; j++) {
		red = randInt(0,255);
		green = randInt(0,255);
		blue = randInt(0,255);
		ctx.fillStyle = "rgba("+red+","+green+","+blue+",1)";
		ctx.fillRect(j,i,1,1);
	}

	// Set up the next run
	i++;
	setTimeout("drawRow("+i+")",0);
}

// drawIt: Start it up
function drawIt() {
	//setTimeout("drawDot(0,0)",0);
	setTimeout("drawRow(0)",0);
} // function drawIt()

// !===== DOM READY =====
$(document).ready(function(){
	// Set up our canvas/context - in here to ensure load
	canvas = document.getElementById("surface");
	ctx = canvas.getContext("2d");

	// Bind up our event for clicking
	$("#surface").click(function(e){
		drawIt();
	}); // $("#surface").click(...)
}); // $(document).ready(...)
