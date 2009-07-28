/*
 * Cyborg Minion
 * Inspired by Robot Master, Copyright (c) Reiner Knizia
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */

// !===== VARIABLES =====
var boardsize = 5;
var $board = $('#gameboard');
var deck;

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

// getScoringArray(): Just so I don't have to rewrite this loop bunches of times
function getScoringArray() {
	var scores = Array();
	for (var i = 0; i < boardsize + 1; ++i) {
		scores.push(0);
	} // for (var i = 0; i < boardsize + 1; ++i)
	return scores;
} // function getScoringArray()

// calcScore(scores): Calculate a score based on one array of cards
function calcScore(scores) {
	var sumscore = 0;
	for (var i = 0; i < boardsize + 1; ++i) {
		switch(scores[i]) {
			case 2:
				// 10x the value of this card
				sumscore += 10 * i;
				break;
			case 1:
				// Value of the card
				sumscore += i;
			default:
				// If it's 3 or more, add in a flat 100
				// Otherwise, do nothin'
				if (scores[i] > 2) sumscore += 100;
				break;
		} // switch(curscore[i])
	} // for (var i = 0; i < boardsize + 1; ++i)
	return sumscore;
} // function calcScore(scores)

// calcScores(): Determine current scores
function calcScores() {
	// Use a negative value for first score for safety's sake
	var lowscore = -1;
	var lowid = '';
	var scores, sumscore;
	for (var i = 0; i < boardsize; ++i) {
		// Observe the cards in the rows
		scores = getScoringArray();
		$('li.square[id^=square_'+i+']').each(function(){
			if (this.innerHTML != '') {
				scores[parseInt(this.innerHTML)]++;
			}
		});
		// Calculate the score
		sumscore = calcScore(scores);
		$('li#score_row_'+i).text(sumscore);
		// Check it for lowest value
		if (sumscore < lowscore || lowscore < 0) {
			// Store the score
			lowscore = sumscore;
			// Remember where we are
			lowid = 'row_'+i;
		} // if (sumscore < lowscore || lowscore < 0)

		// Observe the cards in the columns
		scores = getScoringArray();
		$('li.square[id$=_'+i+']').each(function(){
			if (this.innerHTML != '') {
				scores[parseInt(this.innerHTML)]++;
			}
		});
		// Calculate the score
		sumscore = calcScore(scores);
		$('li#score_col_'+i).text(sumscore);
		// Check it for lowest value
		if (sumscore < lowscore || lowscore < 0) {
			// Store the score
			lowscore = sumscore;
			// Remember where we are
			lowid = 'col_'+i;
		} // if (sumscore < lowscore || lowscore < 0)

		// Set the score, identify the low notch
		$('li#score_current').text(lowscore);
		$('li.score').removeClass('lowest');
		$('li#score_'+lowid).addClass('lowest');
	} // for (var i = 0; i < boardsize; ++i)
} // function calcScores()

// setupBoard(): Sets up the board (duh)
function setupBoard() {
	// Make sure our boardsize is odd
	if (boardsize % 2 !== 1) {
		alert('BAD BOARD SIZE, ARGH!');
		return;
	} // if (boardsize % 2 !== 1)

	// Clean out the gameboard
	$board.empty();

	// Set up our deck - a scoring array works nicely here
	deck = getScoringArray();

	// Do some building
	for (var i = 0; i < boardsize + 1; ++i) {
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
			} // if (i < boardsize)
		} // for (var j = 0; j < boardsize; ++j)
		newLI.append(newUL);
		$board.append(newLI);
	} // for (var i = 0; i < boardsize; ++i)

	// Seed the first square
	$('li#square_'+Math.floor(boardsize/2)+'_'+Math.floor(boardsize/2)).text(getCard());

	// Calculate current scores once set up
	calcScores();
}

// !===== DOM READY =====
$(document).ready(function(){
	// Set up live event for clicking
	$('li.square').live('click', function(){
		// If we already have something in our innerHTML, get out
		if (this.innerHTML !== '') return;
		
		// Add a new card there -- not proper logic
		this.innerHTML = getCard();
		// Redo scoring
		calcScores();
	}); // $('li.square').live('click', ...)

	// Set up the board
	setupBoard();
}); // $(document).ready(...)
