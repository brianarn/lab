/*
 * Stars
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */

// !===== VARIABLES =====
// Our canvas
var canvas;
// Our 2D context for drawing
var ctx;
// Scaling factors
var scale_min = 5;
var scale_max = 20;
// Framerate of animation
var framerate = 30;
// Are we animating? Also, value to clear it
var isAnimating = false;
var animTimeout;
// Are we falling?
var isFalling = true;
var fallMin = 1;
var fallMax = 10;
// How old do we let 'em get (in milliseconds)?
var isAging = true;
var ageMin = 2000;
var ageMax = 8000;
// How many ticks in a mousemove, and since our last add
var mouseTicksMax = 2;
var mouseTicksCur = 0;
// Our star list
var stars = new Array();

// !===== FUNCTIONS =====
// randInt: Get a random number in the range provided
function randInt(min, max) {
	return Math.floor(Math.random() * (max-min)) + min;
} // function randInt(min, max)

// addStar: Put a star in the array
function addStar(ptX, ptY) {
	var star = {};
	star.X = ptX;
	star.Y = ptY;
	star.red = randInt(0,255)
	star.green = randInt(0,255)
	star.blue = randInt(0,255)
	star.fallRate = randInt(fallMin, fallMax);
	star.age = 0;
	star.ageMax = randInt(ageMin, ageMax);
	stars.push(star);
	if (!isAnimating) drawStar(star);
}

// drawStars: Draws all stars in the array
function drawStars() {
	// Clear the field, get ready to draw anew
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Stop the animation if we're out of stars
	if (stars.length == 0) {
		$("#stop_anim").click();
		return;
	}

	// Set up a list of stars to remove
	var deadStars = new Array();

	// Logging time
	log.profile("Drawing stars");

	// Loop over each star, draw, and manage
	$.each(stars, function(i) {
		// Render it
		drawStar(this);
		// Clean up old stars
		if (isAging) {
			this.age += 1000/framerate;
			if (this.age > this.ageMax) {
				deadStars.push(i);
			}
		} // if (isAging)
		// Clean up stars that may have fallen out
		if (isFalling) {
			this.Y += this.fallRate;
			if (this.Y > canvas.height) {
				deadStars.push(i);
			}
		} // if (isFalling)
	}); // $.each
	log.profile("Drawing stars");

	// Now, loop over deadStars, and splice out the dead ones
	// Using the count to scale the index, since it'll shift
	// as we remove them
	$.each(deadStars, function(i) {
		stars.splice(this-i,1);
	});

} // function drawStars()

// drawStar: Just render a star to the canvas
function drawStar(star) {
	// If we're out of bounds, just return
	if (star.X > canvas.width || star.Y > canvas.height) return;
	// Come up with a random scale
	var scale = randInt(scale_min, scale_max);
	// Figure out transparency
	var alpha;
	if (star.age == 0) {
		alpha = 1;
	} else {
		alpha = 1 - (star.age/star.ageMax);
	}

	// Draw it
	ctx.save();
	ctx.translate(star.X, star.Y);
	ctx.rotate(randInt(0,parseInt(2*Math.PI)));
	ctx.fillStyle = "rgba("+star.red+","+star.green+","+star.blue+","+alpha+")";
	ctx.beginPath();
	ctx.moveTo(-scale,0);
	ctx.quadraticCurveTo(0,0,0,-scale);
	ctx.quadraticCurveTo(0,0,scale,0);
	ctx.quadraticCurveTo(0,0,0,scale);
	ctx.quadraticCurveTo(0,0,-scale,0);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
} // function drawStar(star)

// animStars: A safe way to manage star animations
function animStars() {
	drawStars();
	if (!isAnimating) {
		clearInterval(animTimeout);
	}
} // function animStars()

// !===== DOM READY =====
$(document).ready(function(){
	// Set up our canvas/context - in here to ensure load
	canvas = document.getElementById("surface");
	ctx = canvas.getContext("2d");
}); // $(document).ready(...)

// !===== EVENTS =====
// When the canvas is clicked, do something
$("#surface").click(function(e){
	// Determine where we were clicked and add that star
	var ptX, ptY;
	ptX = e.pageX - this.offsetLeft;
	ptY = e.pageY - this.offsetTop;
	log.debug("("+ptX+","+ptY+")");
	addStar(ptX, ptY);
}); // $("#surface").click(...)
$("#surface").mousemove(function(e){
	if (mouseTicksCur <= 0) {
		// Determine where we were clicked and add that star
		var ptX, ptY;
		ptX = e.pageX - this.offsetLeft;
		ptY = e.pageY - this.offsetTop;
		addStar(ptX, ptY);
		mouseTicksCur = mouseTicksMax;
	}
	mouseTicksCur--;
});

$("#start_anim").click(function(){
	if (isAnimating) return;
	isAnimating = true;
	animTimeout = setInterval(drawStars, 1000/framerate);
});
$("#stop_anim").click(function(){
	if (!isAnimating) return;
	isAnimating = false;
	clearInterval(animTimeout);
});
$("#seed_stars").click(function(){
	for (i = 0; i < 100; i++) {
		addStar(randInt(0,canvas.width-1),randInt(0,canvas.height-1))
	}
});
