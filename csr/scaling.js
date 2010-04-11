// Some variables
var FPS, message, rotation, abom, abomctx, ci;

// Set some values
FPS = 20;
rotation = 0;
message = "Comic Sans ROCKS!";

// Functions
function drawText(ctx, message, rot) {
	var s,x,y;
	s= 0.97;
	x = abom.width * ((1-s)/2);
	y = abom.height * ((1-s)/2);
	// Draw itself onto itself, scaled just a bit
	ctx.save();
	ctx.globalAlpha = 0.01;
	ctx.fillRect(0,0,abom.width,abom.height);
	ctx.globalAlpha = 1;
	ctx.scale(s,s);
	ctx.translate(x,y);
	ctx.drawImage(abom,0,0);
	ctx.restore();
	// Draw a random text bit
	ctx.save();
	ctx.translate(window.innerWidth*Math.random(), window.innerHeight*Math.random());
	ctx.rotate(rot*Math.PI/180);
	ctx.fillStyle = "white";
	ctx.strokeStyle = "blue";
	ctx.shadowBlur = 20 * Math.random() + 10;
	ctx.shadowColor = "green";
	//ctx.shadowColor = "rgb("+255*Math.random()+","+255*Math.random()+","+255*Math.random()+")";
	ctx.shadowOffsetX = 20 * Math.random() - 10;
	ctx.shadowOffsetY = 20 * Math.random() - 10;
	ctx.font = "bold " + parseInt(120 * Math.random() + 30) + "pt Comic Sans MS";
	ctx.fillText(message, 0, 0);
	ctx.strokeText(message, 0, 0);
	ctx.restore();
} // function drawText

// Fullscreen the canvas
abom = document.getElementById('abom');
abom.width = window.innerWidth-5;
abom.height = window.innerHeight-5;

// Get our context out, and go to town
abomctx = abom.getContext('2d');
ci = setInterval(function(){
	drawText(abomctx, message, rotation);
	rotation = 360.0 * Math.random();
}, 1000/FPS);
