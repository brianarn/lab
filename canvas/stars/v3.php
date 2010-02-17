<?
/*
 * Stars
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */
?><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>Stars | RandomThink Labs</title>
		<link type="text/css" rel="stylesheet" href="/labs/styles/reset.css" />
		<link type="text/css" rel="stylesheet" href="/labs/styles/lab.css" />
		<link type="text/css" rel="stylesheet" href="/js/blackbird/blackbird.css" />
		<link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/cupertino/jquery-ui.css" />
		<link type="text/css" rel="stylesheet" href="v3.css" />
	</head>
	<body>
		<header>
			<h1>Stars</h1>
		</header>
		<section id="content">
			<h2>Description</h2>
			<p>Just some experiments with &lt;canvas&gt; and making little stars appear. Processing.js would make this trivial, probably, but I wanted to dabble a bit more.</p>
			<h2>Demo</h2>
			<p>Mousing over the canvas will litter it with stars. You can also click to put a new one in a spot. Click on "Start Animation" to start them moving (new stars are still added as you mouse over during animation), or "Stop Animation" to, well, stop the animation.</p>
			<p>Stars will appear with random color and rotation and scale. Rotation and scale change with each tick of the animation, but color does not. There's also a random rate of fall for each star.</p>
			<div id="controls">
				<ul id="control_list">
					<li id="playpause" class="ui-state-default ui-corner-all" title="Play/Pause animation"><span class="ui-icon ui-icon-play">Play/Pause animation</span></li>
					<li id="step_anim" class="ui-state-default ui-corner-all" title="Step Animation"><span class="ui-icon ui-icon-seek-next">Step Animation</span></li>
				</ul> <!-- #control_list -->
				<div>
					<h3>Old Controls</h3>
					<button id="start_anim">Start Animation</button>
					<button id="stop_anim">Stop Animation</button>
					<button id="step_anim">Step Animation Once</button>
					<button id="seed_stars">Seed 100 random stars</button>
					<button id="reset_stars">Reset</button>
				</div>
			</div> <!-- #controls -->
			<canvas id="starfield" width="600" height="600"></canvas>
		</section> <!-- #content -->
		<footer>
			<p>Stars by <a href="http://www.randomthink.net/">Brian Arnold</a>, MIT licensed so snag away</p>
		</footer>
		<!-- Scripts -->
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7/jquery-ui.min.js"></script>
		<script type="text/javascript" src="/js/blackbird/blackbird_off.js"></script>
		<script type="text/javascript" src="v3.js"></script>
		<!-- Analytics -->
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-279164-1");
pageTracker._trackPageview();
} catch(err) {}</script>
	</body>
</html>
