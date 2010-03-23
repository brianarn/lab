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
// newPath - our path
var newPath = new Array();

// !===== FUNCTIONS =====

// !===== EVENTS =====
// !=== DOM Ready ===
$(document).ready(function(){
	// Create our Raphael object
	r = Raphael("raph_canvas", rWidth, rHeight);
	// Start up from the center
	lastPt.X = rWidth / 2 + 0.01;
	lastPt.Y = rHeight / 2 + 0.01;

	// Start a path
	newPath.push("M " + lastPt.X + " " + lastPt.Y);
	var doodle = r.path(newPath);
	var variance = 200;
	var clearInt;
	var i = 0;
	var stopAt = 100;
	var runTime = 250;

	// Setup
	doodle.attr("fill","90-#f00-#000");
	doodle.attr("stroke","blue");
	doodle.attr("stroke-width","2");

	// Do some pathy doodling
	clearInt = setInterval(
		function(){
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
			//newPath = "M " + lastPt.X + " " + lastPt.Y + " ";
			newPath.push("A " + variance + " " + variance/2);
			newPath.push("0 " + lArc + " " + sweep + " " + newX + " " + newY);
			doodle.animate({path: newPath.join(" ") + " Z"}, runTime * 0.8);

			// Remember where we were
			lastPt.X = newX;
			lastPt.Y = newY;

			// Stop it if need be
			i++;
			if (i >= stopAt) {
				clearInterval(clearInt);
				//doodle.attr({path: newPath.join(" ") + " Z"});
			}
		}, // setInterval function
		runTime
	);

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
