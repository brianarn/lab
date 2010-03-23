// Some variables
var FPS, message, rotation, abom, abomctx;

// Set some values
FPS = 20;
rotation = 0;
message = "Comic Sans ROCKS!";

// Functions
function drawText(ctx, message, rot) {
	with (ctx) {
		save();
		translate(window.innerWidth*Math.random(), window.innerHeight*Math.random());
		rotate(rot*Math.PI/180);
		fillStyle = "white";
		strokeStyle = "blue";
		shadowBlur = 20 * Math.random() + 10;
		shadowColor = "green";
		//shadowColor = "rgb("+255*Math.random()+","+255*Math.random()+","+255*Math.random()+")";
		shadowOffsetX = 20 * Math.random() - 10;
		shadowOffsetY = 20 * Math.random() - 10;
		font = "bold " + parseInt(120 * Math.random() + 30) + "pt Comic Sans MS";
		fillText(message, 0, 0);
		strokeText(message, 0, 0);
		restore();
	} // with (ctx)
} // function drawText

// Fullscreen the canvas
abom = document.getElementById('abom');
abom.width = window.innerWidth-5;
abom.height = window.innerHeight-5;

// Get our context out, and go to town
abomctx = abom.getContext('2d');
setInterval(function(){
	drawText(abomctx, message, rotation);
	rotation = 360.0 * Math.random();
}, 1000/FPS);
