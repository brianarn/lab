/*
 * Fivorion
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */
// ===== VARIABLES =====
var isMouseDown = false;
var isActivating = true;
var isPlaying = false;
var curBeat = 0;
var curTempo = 120;

// ===== DOM Ready =====
$(document).ready(function(){
	// ===== UI =====
	// Show our value
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
		}
	});

	// ===== EVENTS =====
	// Track a mouse state
	$(document)
		.mousedown(function(){ isMouseDown = true; })
		.mouseup(function(){ isMouseDown = false; isActivating = true; });
	$('li.tone')
		.mousedown(function(){
			var $this = $(this);
			isActivating = !$this.is('.active');
			$(this).toggleClass('active');
		})
		.mouseup(function(){
		})
		.mouseover(function(){
			var $this = $(this);
			if (isMouseDown) {
				if (isActivating) {
					$this.addClass('active');
				} else {
					$this.removeClass('active');
				}
			}
		});

	// Controls
	$("#playpause").click(function(){
		if (isPlaying) {
			isPlaying = false;
			stopAllAudio();
			this.innerHTML = 'Start!';
		} else {
			isPlaying = true;
			this.innerHTML = 'Stop!';
			curBeat = 0;
			playBeat();
		}
	});

	$('#clearall').click(function(){
		$('.tonecol li.active').removeClass('active');
	});
});

// ===== Functions =====
function playBeat() {
	if (isPlaying) {
		var nextBeat = 60000 / curTempo / 4;
		// Stop sounds
		stopAllAudio();
		// Find and play the sound associated with each light
		$('#tonecol_'+curBeat+' li.active').each(function(){
			var sound_id = 'sound_' + this.id.split('_')[1];
			document.getElementById(sound_id).play();
		});
		// Move the beat
		curBeat = (curBeat + 1) % 16;
		// Set up to run again
		setTimeout(playBeat, nextBeat);
	} // if (isPlaying)
}

function stopAllAudio() {
	$('audio').each(function() {
		this.pause();
		this.currentTime = 0.0;
	});
}
