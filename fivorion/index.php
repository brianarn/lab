<?
/*
 * Fivorion
 * Copyright (c) 2009 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 */

// Check for a request of different tones
$tones = isset($_REQUEST['tones']) ? $_REQUEST['tones'] : 'blip';

// Build a proper path
$tones = "./tones/$tones";

// Check for the presence of the tones
if (!is_dir($tones)) trigger_error('Not a valid tone selection!', E_USER_ERROR);

// A convenience array
$notes = array('c','d','e','f','g','a','b');

// Build up a tone list
$tonelist = '';
for ($i = 0; $i < 16; $i++) {
	// Start it up
	$tonelist .= "<li id=\"tonecol_$i\" class=\"tonecol\"><ul id=\"tonelist_$i\" class=\"tonelist\">";
	// Loop it up
	for ($j = 2; $j < 5; $j++) {
		for ($k = 0; $k < count($notes); $k++) {
			// Figure out the path for the note - using wav files
			$notepath = "$tones/{$notes[$k]}$j.wav";
			$toneid = "tone_{$notes[$k]}{$j}_{$i}";
			$tonelist .= "<li id=\"$toneid\" class=\"tone\">{$notes[$k]}$j</li>";
			// Special breakpoint - D4 is the last note
			if ($notes[$k] == 'd' && $j ==4) break;
		} // for ($k = 0; $k < $notes.length; $k++)
	} // for ($j = 2; $j < 5; $j++)
	// Wrap it up
	$tonelist .= '</ul></li>';
} // for ($i = 0; $i < 16; $i++)
?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>Fivorion | Brian's Lab</title>
		<link type="text/css" rel="stylesheet" href="../styles/reset.css" />
		<link type="text/css" rel="stylesheet" href="../styles/lab.css" />
		<link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/redmond/jquery-ui.css" />
		<link type="text/css" rel="stylesheet" href="fivorion.css" />
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7/jquery-ui.min.js"></script>
		<!--[if lte IE 8]>
		<script src="../js/html5.js" type="text/javascript"></script>
		<![endif]-->
	</head>
	<body>
		<header>
			<h1>Fivorion</h1>
		</header>
		<section id="description">
			<p>More later - for now, Google about for Tenori-on or ToneMatrix</p>
			<p>Also worth noting, each column is a 1/16th note, based on the BPM slider.</p>
		</section>
		<section id="content">
			<ul id="fivorion">
				<?= $tonelist ?>
			</ul> <!-- #fivorion -->
		</section>
		<section id="controls">
			<label>Tempo: <span id="tempovalue"></span> <abbr title="Beats per minute">BPM</abbr></label>
			<div id="temposlider"></div>
			<button id="playpause">Start!</button>
			<button id="clearall">Clear!</button>
		</section>
		<section id="sounds">
			<audio id="sound_c2" src="<?= $tones ?>/c2.wav" autobuffer></audio>
			<audio id="sound_d2" src="<?= $tones ?>/d2.wav" autobuffer></audio>
			<audio id="sound_e2" src="<?= $tones ?>/e2.wav" autobuffer></audio>
			<audio id="sound_f2" src="<?= $tones ?>/f2.wav" autobuffer></audio>
			<audio id="sound_g2" src="<?= $tones ?>/g2.wav" autobuffer></audio>
			<audio id="sound_a2" src="<?= $tones ?>/a2.wav" autobuffer></audio>
			<audio id="sound_b2" src="<?= $tones ?>/b2.wav" autobuffer></audio>
			<audio id="sound_c3" src="<?= $tones ?>/c3.wav" autobuffer></audio>
			<audio id="sound_d3" src="<?= $tones ?>/d3.wav" autobuffer></audio>
			<audio id="sound_e3" src="<?= $tones ?>/e3.wav" autobuffer></audio>
			<audio id="sound_f3" src="<?= $tones ?>/f3.wav" autobuffer></audio>
			<audio id="sound_g3" src="<?= $tones ?>/g3.wav" autobuffer></audio>
			<audio id="sound_a3" src="<?= $tones ?>/a3.wav" autobuffer></audio>
			<audio id="sound_b3" src="<?= $tones ?>/b3.wav" autobuffer></audio>
			<audio id="sound_c4" src="<?= $tones ?>/c4.wav" autobuffer></audio>
			<audio id="sound_d4" src="<?= $tones ?>/d4.wav" autobuffer></audio>
		</section>
		<footer>
			<p>Fivorion by <a href="http://www.randomthink.net/">Brian Arnold</a>. Help in naming by <a href="http://futuraprime.net/">Evan Hensleigh</a>.</p>
			<p><a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/us/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc/3.0/us/88x31.png" /></a><br />All audio sounds for <span xmlns:dc="http://purl.org/dc/elements/1.1/" href="http://purl.org/dc/dcmitype/Sound" rel="dc:type">Fivorion</span> are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/us/">Creative Commons Attribution-Noncommercial 3.0 United States License</a>.</p>
		</footer>
		<script type="text/javascript" src="fivorion.js"></script>
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
