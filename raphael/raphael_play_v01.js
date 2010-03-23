/*
 * Raphael Play
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */

// !===== GLOBAL VARIABLES =====
// r: Our Raphael object
var r
// lastPt: A JS object with our last location
var lastPt = {X:0,Y:0};
// rWidth, rHeight: Initial dimensions of canvas
var rWidth = 600, rHeight = 400;

// !===== FUNCTIONS =====

// !===== EVENTS =====
// !=== DOM Ready ===
$(document).ready(function(){
	// Create our Raphael object
	r = Raphael("raph_canvas", rWidth, rHeight);
	// Start up from the center
	lastPt.X = rWidth / 2;
	lastPt.Y = rHeight / 2;

	// Start a path
	var newPath = "M " + lastPt.X + " " + lastPt.Y + " ";
	var variance = 100;

	// Do some pathy doodling
	for (i = 0; i < 100; i++) {
		// Some variables
		var newX = lastPt.X + Math.floor(Math.random()*(variance + 1))-variance/2;
		var newY = lastPt.Y + Math.floor(Math.random()*(variance + 1))-variance/2;
		var sweep = i % 2;
		var lArc = (sweep + 1) % 2;
		// Override
		lArc = 0;

		// Bounds check
		if (newX < 0) newX = Math.abs(newX);
		if (newY < 0) newY = Math.abs(newY);
		if (newX >= rWidth) newX -= 2 * Math.abs(lastPt.X - newX);
		if (newY >= rHeight) newY -= 2 * Math.abs(lastPt.Y - newY);

		// Arc it up
		newPath += "A " + variance + " " + variance/2 + " ";
		newPath += "0 " + lArc + " " + sweep + " " + newX + " " + newY + " ";
		lastPt.X = newX;
		lastPt.Y = newY;
	} // for i
	// Close it up and draw it
	newPath += " z";
	var a = r.path(newPath);
	a.attr("fill","black");
	a.attr("stroke","blue");
	a.attr("stroke-width","3");

	if (false) {
	// Let's make a box!
	var rec = r.rect(rWidth/4, rHeight/4, rWidth/2, rHeight/2, 10);

	// Start some randomness
	setInterval(
		function(){
			rec.scale(Math.random() + 0.5);
		},
		100
	);
	}
}); // $(document).ready(...)
