/*
 * Thumbs
 * Copyright (c) 2010 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */

// Give a hoot, don't pollute (the global namespace)
(function (window, document){
	// === Variables ===
	var thcon, vid;

	// === Functions ===
	// debug: A simple means of writing out some debug info
	// Considered "Cowboy" Ben Alman's debug, but, not quite right for me
	function debug(msg, method) {
		// Dump if no console
		if (!window.console) { return; }

		// Set our default method statement
		if (typeof method === 'undefined') {
			method = 'log';
		}

		// If our method isn't defined, log *that*
		if (!console[method]) {
			console.log('debug called with a method of "' + method + '", defaulting to log');
			method = 'log';
		}

		// Write it out
		console[method](msg);
	} // function debug

	// === Events ===
	document.addEventListener('DOMContentLoaded', function (e){
		debug('DOMContentLoaded fired');

		// Get some references
		vid = document.getElementById('src');
		thcon = document.getElementById('thumbs');

		// Mute the video for now
		vid.muted = true;
		// Cut the speed -- for fun
		vid.playbackRate = 0.5;

		// Set some event handling on the video
		vid.addEventListener('progress', function (e){
			var percentage;
			debug('vid.progress fired');

			// Figure out how far we are in
			percentage = parseInt(vid.buffered.end(0) / vid.duration * 100, 10);
			debug('Progress: ' + percentage + ' percent');
		}, false);

		// Finally, expose a few things to the global space
		// for easier debugging myself
		window.vid = vid;
	}, false);
})(window, document);
