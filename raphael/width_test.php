<?
/*
 * Width Testing
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */
?><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>Width Testing | RandomThink Labs</title>
		<link type="text/css" rel="stylesheet" href="../styles/reset.css" />
		<link type="text/css" rel="stylesheet" href="../styles/lab.css" />
		<link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/redmond/jquery-ui.css" />
		<link type="text/css" rel="stylesheet" href="width_test.css" />
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7/jquery-ui.min.js"></script>
		<!-- Written when Raphael 1.3.0 was current version -->
		<script type="text/javascript" src="/js/raphael/raphael-min.js"></script>
		<!--[if lte IE 8]>
		<script src="/js/html5.js" type="text/javascript"></script>
		<![endif]-->
	</head>
	<body>
		<header>
			<h1>Width Testing</h1>
		</header>
		<section id="content">
			<h2>Will this really work in IE?</h2>
			<p>Apparently.</p>
			<h3>With padding</h3>
			<div id="raph_padded" style="padding-left: 0.5px;"></div>
			<h3>With no padding</h3>
			<div id="raph_unpadded"></div>
		</section> <!-- #content -->
		<footer>
			<p>Width Testing by <a href="http://www.randomthink.net/">Brian Arnold</a>, MIT licensed so snag away</p>
		</footer>
		<script type="text/javascript" src="width_test.js"></script>
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
