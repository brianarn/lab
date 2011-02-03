/*
 * drawspeed.js
 * Simple test of render speeds
 * Last modified: 2011-02-02 22:09:58
 */

// Mmm, clean
(function(){
	var timer, domctx, jscanvas, jsctx, startDOM, startJS;

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

	// Functions!

	// Some drawing functions
	function drawDOM(){
	} // function drawDOM

	function drawJS(){
	} // function drawJS

	// Some initialization to kick off at DOM Ready
	function init(){
		// Get some references, make some stuff
		domctx = document.getElementById('canvas').getContext('2d');
		jscanvas = document.createElement('canvas');
		jscanvas.width = 400;
		jscanvas.height = 400;
		jsctx = jscanvas.getContext('2d');

		// Now, some DOM references for events
		startDOM = document.getElementById('startDOM');
		startJS = document.getElementById('startJS');

		startDOM.addEventListener('click', drawDOM, false);
		startJS.addEventListener('click', drawJS, false);
	} // function init

	function randCol(){
		var r, g, b;

		// Yes, this isn't very DRY. No, don't care so much here.
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);

		return 'rgb('+r+','+g+','+b+')';
	}

	// Actually kick off our init at DOM Ready
	document.addEventListener('DOMContentLoaded', init, false);
})();
