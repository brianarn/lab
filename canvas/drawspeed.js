/*
 * drawspeed.js
 * Simple test of render speeds
 * Last modified: 2011-02-02 22:29:25
 */

// Mmm, clean
(function(){
	var timer, domctx, jscanvas, jsctx, startDOM, startJS, output;

	// Timer from Paul Banks
	// See:
	// * http://blog.banksdesigns.co.uk/post/quick-benchmarks-with-jsfiddle
	// * http://jsfiddle.net/pUY7u/2/

	timer = {
		startedAt: null,
		stoppedAt: null,
		start: function() {
			this.stoppedAt = null;
			this.startedAt = new Date();
		},
		stop: function() {
			this.stoppedAt = new Date();
		},
		getTime: function() {
			if (!this.stoppedAt) { this.stop(); }
			return this.stoppedAt.getTime() - this.startedAt.getTime();
		}
	};

	// Generate a random color
	function randCol(){
		var r, g, b;

		// Yes, this isn't very DRY. No, don't care so much here.
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);

		return 'rgb('+r+','+g+','+b+')';
	}

	// Given a context, actually draw out something random on it
	function doDrawing(ctx){
		var numsides = 200,
			scale = 400 / numsides,
			i, j;
		console.log('doDrawing');

		for (i = 0; i < numsides; ++i) {
			for (j = 0; j < numsides; ++j) {
				ctx.fillStyle = randCol();
				ctx.fillRect(i * scale, j * scale, scale, scale);
			} // for j
		} // for i
	} // function doDrawing

	// Some drawing functions
	function drawDOM(){
		var msg;
		console.log('drawDOM');

		// Start timing
		console.log('Starting Timer');
		timer.start();

		// Draw right onto the DOM context
		doDrawing(domctx);

		// Report
		timer.stop();
		msg = 'Complete! Time: ' + timer.getTime() + 'ms';
		console.log(msg);
		output.innerHTML = msg;
	} // function drawDOM

	function drawJS(){
		var msg;
		console.log('drawJS');

		// Start timing
		console.log('Starting Timer');
		timer.start();

		// Draw onto our JS-only context
		doDrawing(jsctx);

		// Now, draw that image onto the DOM context
		domctx.drawImage(jscanvas, 0, 0);

		// Report
		timer.stop();
		msg = 'Complete! Time: ' + timer.getTime() + 'ms';
		console.log(msg);
		output.innerHTML = msg;
	} // function drawJS

	// Some initialization to kick off at DOM Ready
	function init(){
		// Get some references, make some stuff
		domctx = document.getElementById('canvas').getContext('2d');
		jscanvas = document.createElement('canvas');
		jscanvas.width = 400;
		jscanvas.height = 400;
		jsctx = jscanvas.getContext('2d');
		startDOM = document.getElementById('startDOM');
		startJS = document.getElementById('startJS');
		output = document.getElementById('output');

		startDOM.addEventListener('click', drawDOM, false);
		startJS.addEventListener('click', drawJS, false);
	} // function init

	// Actually kick off our init at DOM Ready
	document.addEventListener('DOMContentLoaded', init, false);
})();
