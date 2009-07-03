/*
 * Monte Carlo Pi Approximator
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */
var dartcount = 0;
var increment = 0;
var inthecircle = 0;
var pastPIest = 0;
function throwDart() {
	// Draw the dart
	var dartX = Math.floor(Math.random() * 500);
	var dartY = Math.floor(Math.random() * 500);
	var ctx = $("mcp_square").getContext("2d");
	ctx.beginPath();
	ctx.arc(dartX,dartY,3,0,Math.PI*2,true);
	ctx.fill();

	// Do some math
	var radius = 
		Math.sqrt(
			Math.pow(Math.abs(dartX - 250), 2) +
			Math.pow(Math.abs(dartY - 250), 2)
		);

	// Update
	++increment;
	// If we're within a value of 250, we're in the circle
	if (radius <= 250) ++inthecircle;
	// What's our estimate?
	var curPIest = inthecircle / increment * 4;
	$("mcp_increment").update(increment);
	$("mcp_inthecircle").update(inthecircle);
	$("mcp_piest").update(curPIest);
	if (increment > 1) {
		// Draw the next line value
		// Figure out where our line points should be
		var pastX = (increment - 1) / dartcount * 500;
		var pastY = 100 - (pastPIest * 25);
		var curX = increment / dartcount * 500;
		var curY = 100 - (curPIest * 25);
		var gctx = $("mcp_graph").getContext("2d");
		gctx.beginPath();
		gctx.moveTo(pastX,pastY);
		gctx.lineTo(curX,curY);
		gctx.stroke();
	}
	// Record our current setting into the past
	pastPIest = curPIest;
	if (increment < dartcount) setTimeout(throwDart, 1);
}
$("mcp_start").observe("click", function(e) {
	dartcount = $("mcp_dartcount").value;
	increment = 0;
	inthecircle = 0;
	if (dartcount > 0) {
		// Draw a basis
		var ctx = $("mcp_square").getContext("2d");
		ctx.beginPath();
		ctx.fillStyle = "rgb(0,255,0)";
		ctx.fillRect(0,0,500,500);
		ctx.beginPath()
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.arc(250,250,250,0,Math.PI*2,true);
		ctx.fill();
		ctx.fillStyle = "rgb(0,0,255)";
		var gctx = $("mcp_graph").getContext("2d");
		gctx.save();
		gctx.clearRect(0,0,500,100);
		gctx.strokeStyle = "#F00";
		gctx.beginPath();
		gctx.moveTo(0,100-Math.PI * 25);
		gctx.lineTo(500,100-Math.PI * 25);
		gctx.stroke();
		gctx.restore();
		$("mcp_piest").update("");
		// Do some loopin
		throwDart();
	} // if dartcount > 0
});
