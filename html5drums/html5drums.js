/*
 * HTML 5 Drum Kit
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 * Original drum kit samples freely used from http://bigsamples.free.fr/
 */

// ===== VARIABLES =====
var isPlaying = false;
var curBeat = 0;
var curTempo = 120;

// ===== FUNCTIONS =====
// playBeat: Play the next beat!
function playBeat() {
	if (isPlaying !== false) {
		var nextBeat = 60000 / curTempo / 4;
		// Turn off all lights on the tracker's row
		$("#tracker li.pip").removeClass("active");
		// Light up the tracker on the current pip
		$("#tracker li.pip.col_" + curBeat).addClass("active");
		// Find each active beat, play it
		var tmpAudio;
		$(".soundrow[id^=control] li.pip.active.col_" + curBeat).each(function(i){
			tmpAudio = document.getElementById($(this).data('sound_id'));
			if (!tmpAudio.paused) {
				// Pause and reset it
				tmpAudio.pause();
				tmpAudio.currentTime = 0.0;
			}
			tmpAudio.play();
		});
		// Move the pip forward
		curBeat = (curBeat + 1) % 16;
	} // if (isPlaying)
} // playBeat

// Make a new hash
function buildHash() {
	// Start it
	var newhash = '';
	// For each pip, check and add in a 0/1 as appropriate
	$(".soundrow[id^=control] li.pip").each(function(i){
		newhash += $(this).is('.active') ? '1' : '0';
	});
	// Separate it
	newhash += '|';
	// Now, toss in the beat
	newhash += $('#temposlider').slider('value');
	// Check and see if we really need to update
	if (location.hash != '#' + newhash) location.hash = newhash;
} // buildHash

// Read in our hash
function parseHash() {
	if (location.hash.length > 0) {
		// Split it up, work it out, removing the actual hashmark
		var pieces = location.hash.substring(1).split('|');
		// Set the lights
		var lights = pieces[0];
		$(".soundrow[id^=control] li.pip").each(function(i){
			// Make sure we haven't exceeded
			if (i >= lights.length) return false;
			// Check our location, turn on class if need be
			if (lights.charAt(i) == '1') {
				$(this).addClass('active');
			}
		});
		// Set the tempo
		if (typeof pieces[1] !== 'undefined') {
			$('#temposlider').slider('value', parseInt(pieces[1]));
			$('#tempovalue').innerHTML = pieces[1];
			curTempo = parseInt(pieces[1]);
		}
	}
} // parseHash

// Clear it!
function clearAll() {
	$(".soundrow[id^=control] li.active").removeClass('active');
}

// Run on DOM ready
$(document).ready(function(){
	// Process each of the audio items, creating a playlist sort of setup
	$("audio").each(function(i){
		// Make a self reference for ease of use in click events
		var self = this;

		// Make a sub-list for our control
		var $ul = $('<ul id="control_' + this.id + '" class="soundrow">');
		$ul.append('<li class="header">' + this.title + '</li>');
		// Add 16 list items!
		for (j = 0; j < 16; j++) {
			var $li =
				$('<li class="pip col_'+j+'">'+self.id+'</li>')
				.click(function(){
					$(this).toggleClass('active');
					buildHash();
				})
				.data('sound_id', self.id);
			$ul.append($li);
		} // for (i = 0; i < 16; i++)
		// Append it up
		$('<li>').append($ul).appendTo('#lights');
	});

	// Bind up a click for our button
	$("#soundstart").click(function(){
		if (isPlaying === false) {
			// Start the playing!
			curBeat = 0;
			isPlaying = setInterval(playBeat, 60000 / curTempo / 4);
			// Change our display
			this.innerHTML = "Stop!";
		} else {
			clearInterval(isPlaying);
			isPlaying = false;
			$("#tracker li.pip").removeClass("active");
			$("audio").each(function(){
				this.pause();
				this.currentTime = 0.0;
			});
			this.innerHTML = "Start!";
		}
	});

	$('#clearall').click(clearAll);
	$('#reload').click(parseHash);

	// ===== Misc =====
	// Build or read the hash
	if (location.hash == '') {
		// I was building this at load - but now, no, just to be safe
		//buildHash();
	} else {
		parseHash();
	}

	// Show our value, now that we've built off of the hash
	$('#tempovalue').html(curTempo);
	// Make our tempo slider
	$('#temposlider').slider({
		'value': curTempo,
		'min': 30,
		'max': 180,
		'step': 10,
		'slide': function(e, ui) {
			curTempo = ui.value;
			$('#tempovalue').html(curTempo);
			if (isPlaying !== false) {
				clearInterval(isPlaying);
				isPlaying = setInterval(playBeat, 60000 / curTempo / 4);
			}
		},
		'stop': function(e, ui) {
			buildHash();
		}
	});
});
