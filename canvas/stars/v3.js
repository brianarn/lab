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
// Doing the 8 pt star?
var is8pt = false;
// Framerate of animation
var framerate = 30;
// Are we animating? Also, value to clear it
var isAnimating = false;
var isStopWhenNoStars = false;
var animTimeout;
// Are we falling?
var isFalling = true;
var fallMin = -10;
var fallMax = 5;
// Horizontal acceleration
var horzMin = -8;
var horzMax = 8;
// Mmm, gravity - set positive since in our canvas, higher numbers mean lower visuals
var gravity = 9.8;
// How old do we let 'em get (in milliseconds)?
var isAging = false;
var ageMin = 1000;
var ageMax = 2000;
// How many ticks in a mousemove, and since our last add
var isMouseOverStars = true;
var mouseTicksMax = 0;
var mouseTicksCur = 0;
// For mouse-down sorts of stuff
var isMouseDownStars = true;
var isMouseDown = false;
var mouseDownTimeout;
// Our star list
var stars = new Array();

// !===== FUNCTIONS =====
// randInt: Get a random integer in the range provided
function randInt(min, max) {
	return Math.floor(Math.random() * (max-min)) + min;
} // function randInt(min, max)

// randFloat: Get a random float in the range provided
function randFloat(min, max) {
	return Math.random() * (max - min) + min;
} // randFloat(min, max)

// addStar: Put a star in the array
function addStar(ptX, ptY) {
	var star = {};
	star.X = ptX;
	star.Y = ptY;
	star.red = randInt(0,255)
	star.green = randInt(0,255)
	star.blue = randInt(0,255)
	star.vertAccel = randFloat(fallMin, fallMax);
	star.horzAccel = randFloat(horzMin, horzMax);
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
	if (isStopWhenNoStars && stars.length == 0) {
		$("#stop_anim").click();
		return;
	} // if (isStopWhenNoStars && stars.length == 0)

	// Set up a list of stars to remove
	var deadStars = new Array();

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
			// Adjust the vertical acceleration
			this.vertAccel += gravity * framerate/1000;
			log.debug("vert: " + this.vertAccel);
			// Adjust the horizontal
			this.X += this.horzAccel;
			this.Y += this.vertAccel;
			if (this.Y > canvas.height || this.X < 0 || this.X > canvas.width) {
				deadStars.push(i);
			}
		} // if (isFalling)
	}); // $.each

	// Now, loop over deadStars, and splice out the dead ones
	// Using the count to scale the index, since it'll shift
	// as we remove them
	$.each(deadStars, function(i) {
		stars.splice(this-i,1);
	}); // $.each(deadStars, ...)
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
	if (is8pt) ctx.quadraticCurveTo(0,0,-scale/2,-scale/2);
	ctx.quadraticCurveTo(0,0,0,-scale);
	if (is8pt) ctx.quadraticCurveTo(0,0,scale/2,-scale/2);
	ctx.quadraticCurveTo(0,0,scale,0);
	if (is8pt) ctx.quadraticCurveTo(0,0,scale/2,scale/2);
	ctx.quadraticCurveTo(0,0,0,scale);
	if (is8pt) ctx.quadraticCurveTo(0,0,-scale/2,scale/2);
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

// addStarFromEvent: Take in the event element and use that to add a new star
function addStarFromEvent(e, elem) {
	// Determine where we were clicked and add that star
	var ptX, ptY;
	ptX = e.pageX - elem.offsetLeft;
	ptY = e.pageY - elem.offsetTop;
	addStar(ptX, ptY);
} // addStarFromEvent(e)

// !===== DOM READY =====
$(document).ready(function(){
	// Set up our canvas/context - in here to ensure load
	canvas = document.getElementById("starfield");
	ctx = canvas.getContext("2d");

	// !===== EVENTS =====
	// !=== Canvas Events ===
	$("#starfield").click(function(e){
		addStarFromEvent(e, this);
	}); // $("#starfield").click(...)

	$("#starfield").mousemove(function(e){
		// Get some info
		var ptX, ptY;
		ptX = e.pageX - this.offsetLeft;
		ptY = e.pageY - this.offsetTop;

		if (isMouseDownStars && isMouseDown) {
			clearInterval(mouseDownTimeout);
			mouseDownTimeout = setInterval("addStar("+ptX+","+ptY+")",5);
		}

		if (!isMouseOverStars) return;
		if (mouseTicksCur <= 0) {
			addStar(ptX, ptY);
			mouseTicksCur = mouseTicksMax;
		}
		mouseTicksCur--;
	}); // $("#starfield").mousemove(...)

	$("#starfield").mousedown(function(e){
		// Find where we're at, and start up our addStar interval
		var ptX, ptY;
		ptX = e.pageX - this.offsetLeft;
		ptY = e.pageY - this.offsetTop;
		mouseDownTimeout = setInterval("addStar("+ptX+","+ptY+")",5);
		isMouseDown = true;
	}); // $("#starfield").mousedown(...)

	$("#starfield").mouseup(function(e){
		clearInterval(mouseDownTimeout);
		isMouseDown = false;
	}); // $("#starfield").mouseup(...)

	$("#starfield").mouseout(function(){
		clearInterval(mouseDownTimeout);
		isMouseDown = false;
	}); // $("#starfield").mouseup(...)

	// !=== Controls Events
	$("#control_list > li").hover(
		// Over
		function(){
			$(this).addClass("ui-state-hover");
		},
		// Out
		function() {
			$(this).removeClass("ui-state-hover");
		}
	); // $("#control_list > li").hover(...)

	$("#playpause").click(function(){
		// jQuery-ify our element
		var $this = $(this);

		// Start/stop animation interval as appropriate
		if (!isAnimating) {
			animTimeout = setInterval(drawStars, 1000/framerate);
		} else {
			clearInterval(animTimeout);
		}

		// Toggle flags/classes
		isAnimating = !isAnimating;
		$this.find("span").toggleClass("ui-icon-play").toggleClass("ui-icon-pause");
	}); // $("#playpause").click(...)

	$("#step_anim").click(function(){
		// If we're not animating, draw the stars once
		if (!isAnimating) {
			drawStars();
		} // if (!isAnimating)
	}); // $("#step_anim").click(...)

	// !=== Old Controls Events ===
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
	$("#step_anim").click(drawStars);
	$("#seed_stars").click(function(){
		for (i = 0; i < 100; i++) {
			addStar(randInt(0,canvas.width-1),randInt(0,canvas.height-1))
		}
	});
	$("#reset_stars").click(function(){
		stars = new Array();
		ctx.clearRect(0,0,canvas.width,canvas.height);
	});
}); // $(document).ready(...)

