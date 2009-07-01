<?
// I like to do all my processing up front
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
			$toneid = "tone_{$notes[$k]}$j";
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
			<label for="temposlider">Tempo: <span id="tempovalue"></span> <abbr title="Beats per minute">BPM</abbr></label>
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
		</footer>
		<script type="text/javascript">
			// ===== VARIABLES =====
			var isMouseDown = false;
			var isActivating = true;
			var isPlaying = false;
			var curBeat = 0;
			var curTempo = 120;

			// ===== DOM Ready =====
			$(document).ready(function(){
				// ===== UI =====
				// Show our value
				$('#tempovalue').html(curTempo);
				// Make our tempo slider
				$('#temposlider').slider({
					'value': curTempo,
					'min': 30,
					'max': 180,
					'step': 10,
					'slide': function(e, ui) {
						curTempo = ui.value;
						$('#tempovalue').html(curTempo);
					}
				});

				// ===== EVENTS =====
				// Track a mouse state
				$(document)
					.mousedown(function(){ isMouseDown = true; })
					.mouseup(function(){ isMouseDown = false; isActivating = true; });
				$('li.tone')
					.mousedown(function(){
						var $this = $(this);
						isActivating = !$this.is('.active');
						$(this).toggleClass('active');
					})
					.mouseup(function(){
					})
					.mouseover(function(){
						var $this = $(this);
						if (isMouseDown) {
							if (isActivating) {
								$this.addClass('active');
							} else {
								$this.removeClass('active');
							}
						}
					});

				// Controls
				$("#playpause").click(function(){
					if (isPlaying) {
						isPlaying = false;
						stopAllAudio();
						this.innerHTML = 'Start!';
					} else {
						isPlaying = true;
						this.innerHTML = 'Stop!';
						curBeat = 0;
						playBeat();
					}
				});

				$('#clearall').click(function(){
					$('.tonecol li.active').removeClass('active');
				});
			});

			// ===== Functions =====
			function playBeat() {
				if (isPlaying) {
					var nextBeat = 60000 / curTempo / 4;
					// Stop sounds
					stopAllAudio();
					// Find and play the sound associated with each light
					$('#tonecol_'+curBeat+' li.active').each(function(){
						var sound_id = 'sound_' + this.id.split('_')[1];
						document.getElementById(sound_id).play();
					});
					// Move the beat
					curBeat = (curBeat + 1) % 16;
					// Set up to run again
					setTimeout(playBeat, nextBeat);
				} // if (isPlaying)
			}

			function stopAllAudio() {
				$('audio').each(function() {
					this.pause();
					this.currentTime = 0.0;
				});
			}
		</script>
	</body>
</html>
