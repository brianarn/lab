/*
 * Kember Worker
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 *
 * Liberally using portions of Stephen McCarthy's JS solution, freely provided as public domain
 *
 * The major difference in my approach is that I'm using Web Workers only available in more modern browsers.
 */
importScripts('../js/md5-min.js');

var hexChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f'];
var found = false;
var running = false;
var numProcessed = 0;
var kID = -1;
 
function generateRandomHash() {
	var buffer = [];
	for (var i = 0; i < 32; i++) {
		buffer.push(hexChars[Math.floor(Math.random() * 16)]);
	} // for (var i = 0; i < 32; i++)
	return buffer.join('');
}

function processHash() {
	// Set up the message object we'll send back
	var msg = {};
	// Get a new hash
	var newhash = generateRandomHash();
	// Process it
	var hashedhash = hex_md5(newhash);
	if (newhash == hashedhash) {
		//setTimeout(processHash, 50);
		found = true;
		running = false;
	}
	numProcessed++;
	// Set up options in the return message
	msg.id = kID;
	msg.found = found;
	msg.running = running;
	msg.hash = newhash;
	msg.md5 = hashedhash;
	msg.numProcessed = numProcessed;
	// Send it up
	postMessage(msg);
	// If we're supposed to keep running, let's do so
	if (running) {
		setTimeout(processHash, 0);
	}
}

onmessage = function(e) {
	// Set our ID if unset
	if (kID < 0) {
		kID = parseInt(e.data.id);
	}

	// Take actions
	switch(e.data.action) {
		case "init":
			// Just to be safe - does nothing
			break;
		case "start":
			running = true;
			processHash();
			break;
		case "stop":
			running = false;
			break;
		default:
			alert("Crap, bad message!");
			break;
	}
};
