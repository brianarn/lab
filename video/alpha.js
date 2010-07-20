/*
 * Alpha
 * Copyright (c) 2010 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */

// Give a hoot, don't pollute (the global namespace)
(function (window, document){
	// === Variables ===
	var vid, output, octx, interim, ictx, range, timer, ctrl, rewind;

	// === Functions ===
	// debug: A simple means of writing out some debug info
	// Considered "Cowboy" Ben Alman's debug, but, not quite right for me
	function debug(msg, method) {
		// Dump if no console
		if (!window.console) { return; }

		// Set our default method statement
		if (typeof method === 'undefined' || !console[method]) {
			method = 'log';
		}

		// Write it out
		console[method](msg);
	} // function debug

	// toCanvas: Write the video into the canvas
	function toCanvas() {
		// We have to use an interstitial canvas,
		// because it looks like writing video doesn't
		// respect globalAlpha.
		ictx.drawImage(vid, 0, 0);
		octx.drawImage(interim, 0, 0);
	} // toCanvas

	// === Events ===
	document.addEventListener('DOMContentLoaded', function (e){
		debug('DOMContentLoaded fired');

		// Get some references
		vid = document.getElementById('src');
		output = document.getElementById('output');
		octx = output.getContext('2d');
		interim = document.getElementById('interim');
		ictx = interim.getContext('2d');
		range = document.getElementById('range');
		ctrl = document.getElementById('ctrl');
		rewind = document.getElementById('rewind');
		alpha = 1;

		// Mute the video for now
		vid.muted = true;

		// Max out the range
		range.value = range.max;

		// Set up some events
		vid.addEventListener('loadedmetadata', function (e) {
			debug('vid.loadedmetadata');

			// Resize the canvas
			output.width = vid.videoWidth;
			output.height = vid.videoHeight;
			interim.width = vid.videoWidth;
			interim.height = vid.videoHeight;
		}, false); // loadedmetadata

		vid.addEventListener('canplay', function (e) {
			debug('vid.canplay');

			// Enable our buttons
			ctrl.removeAttribute('disabled');
			rewind.removeAttribute('disabled');
		}, false);

		vid.addEventListener('play', function (e) {
			debug('vid.play');

			// Video is playing, so kick up our refresher
			timer = setInterval(toCanvas, 1000 / 30);
		}, false); // vid play

		vid.addEventListener('pause', function (e) {
			debug('vid.pause');

			// Video is being paused, so stop the refreshser
			clearInterval(timer);
		}, false); // vid pause

		ctrl.addEventListener('click', function (e) {
			debug('ctrl.click')

			if (vid.paused) {
				vid.play();
				ctrl.innerHTML = 'Pause';
			} else {
				vid.pause();
				ctrl.innerHTML = 'Play';
			}
		}, false);

		range.addEventListener('change', function (e) {
			debug('range.change');

			// Just tweak the alpha
			//alpha = parseInt(range.value, 10) / parseInt(range.max, 10);
			octx.globalAlpha = parseInt(range.value, 10) / parseInt(range.max, 10);
		}, false);

		rewind.addEventListener('click', function (e) {
			var wasPaused = vid.paused;

			if (!wasPaused) { vid.pause(); }
			vid.currentTime = 0;
			if (!wasPaused) { vid.play(); }
		}, false);

		// Expose a few things to the global space
		// for easier debugging myself
		window.vid = vid;
		window.range = range;
		window.ctrl = ctrl;
	}, false);
})(window, document);
