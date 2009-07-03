/*
 * Circles experiments
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */
var ismousedown = false;
var canvasOffset = $("circles").viewportOffset();
var ctx  = $("circles").getContext("2d");
var bctx = $("circles_bg").getContext("2d");
var downX, downY;
// Let's watch some events on the canvas
// When the mouse goes down, we want to start recording where we went down
$("circles").observe("mousedown", function(e) {
	// Let's determine where we were clicked
	var xpos = e.pointerX() - canvasOffset.left;
	var ypos = e.pointerY() - canvasOffset.top;
	ismousedown = true;
	downX = xpos;
	downY = ypos;
});
$("circles").observe("mouseup", function(e) {
	// Let's determine where we were clicked
	var xpos = e.pointerX() - canvasOffset.left;
	var ypos = e.pointerY() - canvasOffset.top;
	//var radius = sqrt(abs(xpos - downX)^2 + abs(ypos - downY)^2);
	var radius = 
		Math.sqrt(
			Math.pow(Math.abs(xpos - downX), 2) +
			Math.pow(Math.abs(ypos - downY), 2)
		);
	ismousedown = false;
	// Write down
	//bctx.drawImage($("circles"),0,0);
	bctx.save();
	bctx.translate(downX, downY);
	var radgrad = bctx.createRadialGradient(-radius/5,-radius/5,0,-radius/5,-radius/5,radius/2);
	radgrad.addColorStop(0,"rgba(255,255,255,1)");
	radgrad.addColorStop(1,"#000");
	bctx.beginPath();
	bctx.arc(0, 0, radius, 0, Math.PI * 2, true);
	bctx.fillStyle = radgrad;
	bctx.fill();
	bctx.restore();
	// Clean up
	ctx.clearRect(0,0,500,500);
});
$("circles").observe("mousemove", function(e) {
	// Let's determine where we were clicked
	var xpos = e.pointerX() - canvasOffset.left;
	var ypos = e.pointerY() - canvasOffset.top;
	var radius = 
		Math.sqrt(
			Math.pow(Math.abs(xpos - downX), 2) +
			Math.pow(Math.abs(ypos - downY), 2)
		);
	if (ismousedown) {
		// Clean the canvas
		ctx.clearRect(0,0,500,500);
		ctx.beginPath();
		ctx.arc(downX, downY, radius, 0, Math.PI*2, true);
		ctx.moveTo(downX,downY);
		ctx.lineTo(xpos,ypos);
		ctx.stroke();
	};
});
