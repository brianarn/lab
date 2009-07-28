<?
/*
 * Cyborg Minion
 * Inspired by Robot Master, Copyright (c) Reiner Knizia
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */
?><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>Cyborg Minion | RandomThink Labs</title>
		<link type="text/css" rel="stylesheet" href="../styles/reset.css" />
		<link type="text/css" rel="stylesheet" href="../styles/lab.css" />
		<link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/redmond/jquery-ui.css" />
		<link type="text/css" rel="stylesheet" href="cyborgminion.css" />
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7/jquery-ui.min.js"></script>
		<!--[if lte IE 8]>
		<script src="../js/html5.js" type="text/javascript"></script>
		<![endif]-->
	</head>
	<body>
		<header>
			<h1>Cyborg Minion</h1>
		</header>
		<section id="gamearea">
			<div>
				<h2>Game Board</h2>
				<ul id="gameboard">
				</ul> <!-- #gameboard -->
			</div>
			<div>
				<h2>Controls</h2>
				<ul id="controls">
				</ul> <!-- #controls -->
			</div>
		</section> <!-- #gamearea -->
		<section id="description">
			<h2>What is Cyborg Minion?</h2>
			<p>In short, it's a basic implementation of the mechanics of Reiner Knizia's <a href="http://www.boardgamegeek.com/boardgame/37362">Robot Master</a>. The naming is inspired by the fact that Robot Chicken goes by <a href="http://twitter.com/cyborgturkey">@cyborgturkey</a> on Twitter.</p>
			<h2>So, how do I play?</h2>
			<p>There's an article on Touch Arcade about the first version of the iPhone game. <a href="http://toucharcade.com/2009/07/08/reiner-knizias-robot-master-frustratingly-fun/">Go read the tutorial excerpt</a>, and if you have an iPhone, seriously, buy the game there. It's much better with a leaderboard and averages and all that. This version here is meant to be a basic interactive demo, whereas the iPhone one is all sanctioned and awesome.</p>
		</section> <!-- #description -->
		<footer>
			<p>Cyborg Minion by <a href="http://www.randomthink.net/">Brian Arnold</a>. MIT licensed.</p>
		</footer>
		<script type="text/javascript" src="cyborgminion.js"></script>
		<!-- Analytics -->
		<script type="text/javascript">
			var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
			document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
		</script>
		<script type="text/javascript">
			try {
			var pageTracker = _gat._getTracker("UA-279164-1");
			pageTracker._trackPageview();
			} catch(err) {}
		</script>	
	</body>
</html>
