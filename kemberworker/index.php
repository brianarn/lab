<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>Kember Worker | RandomThink Labs</title>
		<link type="text/css" rel="stylesheet" href="../styles/reset.css" />
		<link type="text/css" rel="stylesheet" href="../styles/lab.css" />
		<link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/redmond/jquery-ui.css" />
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7/jquery-ui.min.js"></script>
		<!--[if lte IE 8]>
		<script src="../js/html5.js" type="text/javascript"></script>
		<![endif]-->
	</head>
	<body>
		<header>
			<h1>Kember Worker</h1>
		</header>
		<section id="content">
			<h2>What is the Kember Identity?</h2>
			<p>Well, I don't need to write that up, <a href="http://elliottkember.com/kember_identity.html">he did</a>.</p>
			<h2>So, what are <em>you</em> doing that's different?</h2>
			<p>Trying to determine it utilizing the power of Web Workers! We'll run a few in parallel.</p>
			<h2>How's it going so far?</h2>
			<p>Still haven't invested a proper amount of time yet. So now, it's not actually checking for MD5, just generating random hashes. Soon, though!</p>
			<h2>Results</h2>
			<ul id="results">
			</ul>
		</section>
		<footer>
			<p>Kember Workers by <a href="http://www.randomthink.net/">Brian Arnold</a>. All software herein falls under an <a href="/lab/LICENSE">MIT License</a>.</p>
		</footer>
		<script type="text/javascript">
			// Run on DOM ready
			$(document).ready(function(){
				for (var i = 0; i < 4; i++) {
					var worker = new Worker("kemberworker.js");
					worker.onmessage = function(e) {
						// Push out the results
						$('#results').append('<li>' + e.data + '</li>');
					}; // worker.onmessage = function(e)
					// Will tell them who's who
					worker.postMessage(i);
				} // for (var i = 0; i < 4; i++)
			});
		</script>
	</body>
</html>
