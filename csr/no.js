(function(){
	// General
	var FPS, rotation, w, h, animint, comictime, holdtime;
	// Canvases
	var lgrno, abomctx, redgel, redgelctx, lgrno, lgrnoctx;
	
	// But first, hide our preloading paragraph
	//document.getElementById("preloadfont").style.display = 'none';
	
	// Set some values
	w = window.innerWidth - 1;
	h = window.innerHeight - 1;
	FPS = 1000;
	rotation = 0;
	message = "Comic Sans ROCKS!";
	comictime = 5000;
	holdtime = 1000;
	
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
			//font = parseInt(120 * Math.random() + 30) + "pt LeagueGothicRegular";
			fillText(message, 0, 0);
			strokeText(message, 0, 0);
			restore();
		} // with (ctx)
	} // function drawText
	
	// Get some canvases
	abom = document.getElementById('abom');
	abom.width = w;
	abom.height = h;
	abomctx = abom.getContext('2d');
	redgel = document.getElementById('redgel');
	redgel.width = w;
	redgel.height = h;
	redgelctx = redgel.getContext('2d');
	lgrno = document.getElementById('lgrno');
	lgrno.width = w;
	lgrno.height = h;
	lgrnoctx = lgrno.getContext('2d');
	
	// TEST TEST
	/*
	lgrnoctx.fillStyle = "#00FF00";
	//lgrnoctx.fillRect(100,100,200,200);
	lgrnoctx.font = "bold 40pt LeagueGothicRegular";
	lgrnoctx.fillText("YAR",20,20);
	redgelctx.fillStyle = "#0000FF";
	redgelctx.fillRect(200,200,300,300);
	*/
	
	// Blackout
	abomctx.save();
	abomctx.fillStyle = "black";
	abomctx.fillRect(0,0,w,h);
	abomctx.restore();

	// Start drawing our "Comic Sans ROCKS" bit
	animint = setInterval(function(){
		drawText(abomctx, "Comic Sans ROCKS!", rotation);
		rotation = 360.0 * Math.random();
	}, 1000/FPS);
	
	// Stop it and do the overlay work now
	setTimeout(function(){
		clearInterval(animint);
		with (abomctx) {
			save();
			globalCompositeOperation = 'xor';
			fillStyle = "rgba(0,0,0,0.7)";
			fillRect(0,0,w,h);
			globalCompositeOperation = 'darker';
			fillStyle = "rgba(110,13,6,1)";
			fillRect(0,0,w,h);
			restore();
		} // with (redgelctx)
	}, comictime);
	setTimeout(function(){
		//var msgMeasure;
		var fontsize = 0, fontwidth = 0, msg = "No, it doesn't.";
		with (redgelctx) {
			save();
			fillStyle = "rgba(212,0,1,1)";
			strokeStyle = "rgba(0,0,0,1)";
			shadowColor = "rgba(0,0,0,1)";
			shadowBlur = 1;
			
			do {
				fontsize += 10;
				font = "bold " + fontsize + "pt LeagueGothicRegular";
				fontwidth = measureText(msg).width;
			} while (fontwidth < w * 0.8)
			
			//font = "60pt Comic Sans MS";
			//msgMeasure = abomctx.measureText("No, it doesn't.");
			//console.log(globalCompositeOperation);
			translate((w - fontwidth)/2,h/2);
			fillText(msg, 0, 0);
			strokeText(msg, 0, 0);
			restore();
		} // with (abomctx)
	}, comictime + holdtime);
})();
