/*
 * Cyborg Minion
 * Inspired by Robot Master, Copyright (c) Reiner Knizia
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */

// !===== VARIABLES =====
var boardsize = 5;
var $board = $('#gameboard');
var deck = Array();

// !===== FUNCTIONS =====
// getRandInt(maxval): Gets an integer from 0 to maxval - 1
function getRandInt(maxval) {
	// Justification for this method:
	// http://www.shawnolson.net/a/789/make-javascript-mathrandom-useful.html
	return Math.floor(Math.random() * maxval);
} // function getRandInt(maxval)

// getCard(): Using the random generator, get a card and flag it
function getCard() {
	// A place to store it
	var newCard;
	
	// Get a potential new card value,
	// ensure we've not maxed that stack yet
	do {
		newCard = getRandInt(boardsize + 1);
	} while (deck[newCard] >= boardsize + 1);
	// Mark that we're using it
	deck[newCard]++;
	// Hand it back
	return newCard;
} // function getCard()

// calcScores(): Determine current scores
function calcScores() {
	// Use a negative value for first score for safety's sake
	var lowscore = -1;
	var curscore = 0;
	var lowid = '';
	for (var i = 0; i < boardsize; ++i) {
		// Calculate the rows
		curscore = 0;
		$('li.square[id^=square_'+i+']').each(function(){
			if (this.innerHTML != '') curscore += parseInt(this.innerHTML);
		});
		$('li#score_row_'+i).text(curscore);
		// Check it
		if (curscore < lowscore || lowscore < 0) {
			// Store the score
			lowscore = curscore;
			// Remember where we are
			lowid = 'row_'+i;
		} // if (curscore < lowscore || lowscore < 0)
		
		// Calculate the columns
		curscore = 0;
		$('li.square[id$=_'+i+']').each(function(){
			if (this.innerHTML != '') curscore += parseInt(this.innerHTML);
		});
		$('li#score_col_'+i).text(curscore);
		// Check it
		if (curscore < lowscore || lowscore < 0) {
			// Store the score
			lowscore = curscore;
			// Remember where we are
			lowid = 'col_'+i;
		} // if (curscore < lowscore || lowscore < 0)
		
		// Set the score, identify the low notch
		$('li#score_current').text(lowscore);
		$('li.score').removeClass('lowest');
		$('li#score_'+lowid).addClass('lowest');
	} // for (var i = 0; i < boardsize; ++i)
} // function calcScores()

// !===== DOM READY =====
$(document).ready(function(){
	// Make sure our boardsize is odd
	if (boardsize % 2 !== 1) {
		alert('BAD BOARD SIZE, ARGH!');
		return;
	} // if (boardsize % 2 !== 1)
	
	// Do some building
	for (var i = 0; i < boardsize + 1; ++i) {
		// Set up an element in our deck
		deck.push(0);
		
		// Build a board row
		var newLI = $('<li id="row_'+i+'" class="row"/>');
		var newUL = $('<ul />');
		for (var j = 0; j < boardsize + 1; ++j) {
			// Build the squares in the board
			if (i < boardsize) {
				if (j < boardsize) {
					// Normal gaming square
					//newUL.append('<li id="square_'+i+'_'+j+'" class="square">'+getRandInt(boardsize+1)+'</li>');
					newUL.append('<li id="square_'+i+'_'+j+'" class="square"></li>');
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
	}); // $('li.square').click(...)
	
	// Seed the first square
	$('li#square_'+Math.floor(boardsize/2)+'_'+Math.floor(boardsize/2)).text(getCard());
}); // $(document).ready(...)
