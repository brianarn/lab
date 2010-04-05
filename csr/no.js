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
		//ctx.font = parseInt(120 * Math.random() + 30) + "pt LeagueGothicRegular";
		ctx.fillText(message, 0, 0);
		ctx.strokeText(message, 0, 0);
		ctx.restore();
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
		abomctx.save();
		abomctx.globalCompositeOperation = 'xor';
		abomctx.fillStyle = "rgba(0,0,0,0.7)";
		abomctx.fillRect(0,0,w,h);
		abomctx.globalCompositeOperation = 'darker';
		abomctx.fillStyle = "rgba(110,13,6,1)";
		abomctx.fillRect(0,0,w,h);
		abomctx.restore();
	}, comictime);
	setTimeout(function(){
		//var msgMeasure;
		var fontsize = 0, fontwidth = 0, msg = "No, it doesn't.";
		redgelctx.save();
		redgelctx.fillStyle = "rgba(212,0,1,1)";
		redgelctx.strokeStyle = "rgba(0,0,0,1)";
		redgelctx.shadowColor = "rgba(0,0,0,1)";
		redgelctx.shadowBlur = 1;
		do {
			fontsize += 10;
			redgelctx.font = "bold " + fontsize + "pt LeagueGothicRegular";
			fontwidth = redgelctx.measureText(msg).width;
		} while (fontwidth < w * 0.8)
		redgelctx.translate((w - fontwidth)/2,h/2);
		redgelctx.fillText(msg, 0, 0);
		redgelctx.strokeText(msg, 0, 0);
		redgelctx.restore();
	}, comictime + holdtime);
})();
