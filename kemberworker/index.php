<?php
/*
 * Kember Worker
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 *
 * Liberally using portions of Stephen McCarthy's JS solution, freely provided as public domain
 *
 * The major difference in my approach is that I'm using Web Workers only available in more modern browsers.
 */

// How many workers?
$workercount = isset($_REQUEST['count']) ? intval($_REQUEST['count']) : 2;
if ($workercount < 1) trigger_error("Need a positive count for workers!", E_USER_ERROR);
?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html;charset=utf-8">
		<title>Kember Worker | RandomThink Labs</title>
		<link type="text/css" rel="stylesheet" href="../styles/reset.css" />
		<link type="text/css" rel="stylesheet" href="../styles/lab.css" />
		<link type="text/css" rel="stylesheet" href="kemberworker.css" />
		<link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/redmond/jquery-ui.css" />
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7/jquery-ui.min.js"></script>
		<!--[if lte ie 8]>
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
			<p>Trying to determine it utilizing the power of web workers! We'll run a few in parallel.</p>
			<h2>How's it going so far?</h2>
			<p>Well, it seems to be working! At least, as far as I can tell. There does seem to be the occasional crash in Firefox, but, I don't know why yet. So, be careful!</p>
			<h2>What if I want to use MOAR WORKERS?</h2>
			<p>If you tweak the querystring to add in a count value, it'll parse the int value out of it and use that. You could do <a href="?count=1">one worker</a> if you're boring, <a href="?count=2">two workers</a> (default), <a href="?count=4">four workers</a> if you've got a quad core, or you could go nuts and type one even higher, though I'm not linking that. I take no responsibility for causing your browser to crash and burn if you blow past a couple.
			<h2>Controls</h2>
			<ul id="controls">
				<li><input type="button" id="start_check" name="start_check" value="Start Processing" /></li>
				<li><input type="button" id="stop_check" name="stop_check" value="Stop Processing" /></li>
			</ul>
			<h2>Results</h2>
			<ul id="results">
				<?php for ($i = 0; $i < $workercount; $i++): ?>
				<li id="worker_<?php echo $i; ?>_parent">
					Worker <?php echo $i; ?>:
					<ul>
						<li id="worker_<?php echo $i; ?>_processed">Processed: 0</li>
						<li id="worker_<?php echo $i; ?>_last">Last hash: none</li>
						<li id="worker_<?php echo $i; ?>_md5">MD5 result: none</li>
						<!-- <li id="worker_<?php echo $i; ?>_found">Found: false</li> -->
					</ul>
				</li>
				<?php endfor; ?>
			</ul>
		</section>
		<footer>
			<p>Kember Workers by <a href="http://www.randomthink.net/">Brian Arnold</a>. All software herein falls under an <a href="/lab/LICENSE">MIT License</a>.</p>
		</footer>
		<script type="text/javascript">
			// Run on DOM ready
			$(document).ready(function(){
				// Set up an array to hang onto our workers
				var workerArray = new Array();

				// Make 'em
				for (var i = 0; i < <?php echo $workercount; ?>; i++) {
					var worker = new Worker("kemberworker.js");
					worker.onmessage = function(e) {
						var kID = e.data.id;
						// Push out the results
						//$('#results').append('<li> Worker' + e.data.id + ' processed ' + e.data.hash + ', not a kember identity (' + e.data.numProcessed + '</li>');
						$("#worker_" + kID + "_processed").html("Processed: " + e.data.numProcessed);
						$("#worker_" + kID + "_last").html("Last hash: " + e.data.hash);
						$("#worker_" + kID + "_md5").html("MD5 result: " + e.data.md5);
						//$("#worker_" + kID + "_found").html("Found: " + e.data.found);
						if (e.data.found === true) {
							stopWorkers();
							alert("FOUND!!! " + e.data.hash);
						} // if (e.data.found === true)
					}; // worker.onmessage = function(e)
					// Will tell them to start, along with an ID
					var msg = new Object;
					worker.postMessage({
						"id":i,
						"action":"init"
					});
					workerArray.push(worker);
				} // for (...)

				function stopWorkers() {
					$.each(workerArray, function(i) {
						this.postMessage({
							"action":"stop"
						});
					});
				} // function stopWorkers

				function startWorkers() {
					$.each(workerArray, function(i) {
						this.postMessage({
							"action":"start"
						});
					});
				} // function stopWorkers

				// Set up some events
				$("#start_check").click(startWorkers);

				$("#stop_check").click(stopWorkers);
			});
		</script>
	</body>
</html>
