/*
 * Raphael Play
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */

// !===== GLOBAL VARIABLES =====
// What will be our Raphael objects
var rPad, rNoPad;
// rWidth, rHeight: Initial dimensions of canvas
var rWidth = 300, rHeight = 300;

// !===== FUNCTIONS =====

// !===== EVENTS =====
// !=== DOM Ready ===
$(document).ready(function(){
	// Create our Raphael objects
	rPad = Raphael("raph_padded", rWidth, rHeight);
	rNoPad = Raphael("raph_unpadded", rWidth, rHeight);

	// Draw a rectangle in each
	rPad.rect(50,50,200,200);
	rNoPad.rect(50,50,200,200);
}); // $(document).ready(...)
