/*
 * Cyborg Minion
 * Inspired by Robot Master, Copyright (c) Reiner Knizia
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */

// !===== VARIABLES =====
var boardsize = 5;
var $board = $('#gameboard');

// !===== FUNCTIONS =====
// getRandInt(maxval): Gets an integer from 0 to maxval - 1
function getRandInt(maxval) {
	// Justification for this method:
	// http://www.shawnolson.net/a/789/make-javascript-mathrandom-useful.html
	return Math.floor(Math.random() * maxval);
}

// !===== DOM READY =====
$(document).ready(function(){
	// Make sure our boardsize is odd
	if (boardsize % 2 !== 1) {
		alert('BAD BOARD SIZE, ARGH!');
		return;
	} // if (boardsize % 2 !== 1)
	
	// Build the board based on the dimensions
	for (var i = 0; i < boardsize + 1; ++i) {
		var newLI = $('<li id="row_'+i+'" class="row"/>');
		var newUL = $('<ul />');
		for (var j = 0; j < boardsize + 1; ++j) {
			if (i < boardsize) {
				if (j < boardsize) {
					// Normal gaming square
					// For now, shove a random value into the li
					newUL.append('<li id="square_'+i+'_'+j+'" class="square">'+getRandInt(boardsize+1)+'</li>');
				} else {
					// Row scoring cell
					newUL.append('<li id="score_row_'+i+'" class="score"></li>');
				} // if (j < boardsize)
			} else {
				if (j < boardsize) {
					// Column scoring cell
					newUL.append('<li id="score_col_'+j+'" class="score"></li>');
				} else {
					// Spare square - let's use it to show current score
					newUL.append('<li id="score_current" class="score"></li>');
				} // if (j < boardsize) {
			}
		} // for (var j = 0; j < boardsize; ++j)
		newLI.append(newUL);
		$board.append(newLI);
	} // for (var i = 0; i < boardsize; ++i)
	
	// Set up events for clicking
	$('li.square').click(function(){
		alert("Value: " + parseInt(this.innerHTML));
	}); // $('li.square').click(...)
}); // $(document).ready(...)
