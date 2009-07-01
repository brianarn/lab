<?
// A convenience variable
$sounds = 0;

// A function to process and echo out a list
function scanForSounds($path) {
	// Pull in sounds
	global $sounds;
	
	// Set up a return value
	$return = '';
	
	// If we've already spit out 16, just dump out
	if ($sounds >= 16) return $return;

	// Open up the directory
	if ($handle = opendir($path)) {
		while (($file = readdir($handle)) !== false) {
			// Skip anything hidden
			if (substr($file, 0, 1) == '.') continue;
			$fullpath = "$path/$file";
			$elem_id = basename($file, '.wav');
			if (is_dir($fullpath)) {
				// Scan this path, add it in
				$return .= scanForSounds($fullpath);
			} else {
				// If it's not a .wav, skip on
				if (substr($file, -4) != '.wav') continue;
				// Set it up as a full-on audio object
				$return .= "<audio id=\"sound_$elem_id\" src=\"$fullpath\" autobuffer></audio>\n";
				$sounds++;
				if ($sounds >= 16) return $return;
			} // if (is_dir($file))
		} // while (($file = readdir($handle)) !== false)
	} // if ($handle = opendir($path))

	// Hand it back
	return $return;
}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>HTML5 Drum Kit</title>
		<!-- CSS -->
		<link type="text/css" rel="stylesheet" href="../styles/reset.css" />
		<link type="text/css" rel="stylesheet" href="../styles/lab.css" />
		<link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/redmond/jquery-ui.css" />
		<link type="text/css" rel="stylesheet" href="styles/html5drums.css" />
		<!-- Scripts -->
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7/jquery.min.js"></script>
		<!--[if lte IE 8]>
		<script src="../js/html5.js" type="text/javascript"></script>
		<![endif]-->
	</head>
	<body>
		<header>
			<h1>HTML5 Drum Kit</h1>
		</header>
		<section id="content">
			<ul id="controls">
				<li>
					<ul id="tracker" class="soundrow">
						<li class="header">Tracker</li><li class="pip col_0"></li><li class="pip col_1"></li><li class="pip col_2"></li><li class="pip col_3"></li><li class="pip col_4"></li><li class="pip col_5"></li><li class="pip col_6"></li><li class="pip col_7"></li><li class="pip col_8"></li><li class="pip col_9"></li><li class="pip col_10"></li><li class="pip col_11"></li><li class="pip col_12"></li><li class="pip col_13"></li><li class="pip col_14"></li><li class="pip col_15"></li>
					</ul>
				</li>
			</ul>
			<button id="soundstart">Start it up!</button>
		</section>
		<section id="sounds">
			<?= scanForSounds('sounds'); ?>
		</section>
		<footer>
			<p>HTML5 Drum Kit by Brian Arnold, All Rights Reserved for now</p>
		</footer>
		<script type="text/javascript">
			// Run on DOM ready
			$(document).ready(function(){
				// Will use to store our setInterval
				var isPlaying = false;

				// Where are we?
				var pipTracker = 0;

				// Process each of the audio items, creating a playlist sort of setup
				$("audio").each(function(i){
					// Dump out after 8 for now
					if (i > 7) return false;
					// Make a self reference for ease of use in click events
					var self = this;

					// Make a sub-list for our control
					var $ul = $('<ul id="control_' + this.id + '" class="soundrow">');
					$ul.append('<li class="header">' + this.id + '</li>');
					// Add 16 list items!
					for (j = 0; j < 16; j++) {
						var $li =
							$('<li class="pip col_'+j+'">')
							.click(function(){
								$(this).toggleClass('active');
							})
							.data('sound_id', self.id);
						$ul.append($li);
					} // for (i = 0; i < 16; i++)
					// Append it up
					$('<li>').append($ul).appendTo('#controls');
				});

				// Bind up a click for our button
				$("#soundstart").click(function(){
					if (isPlaying === false) {
						// Start the playing!
						pipTracker = 0;
						isPlaying = setInterval(playBeat, 125) // Should be 120bpm
						// Change our display
						this.innerHTML = "Stop it!";
					} else {
						clearInterval(isPlaying);
						$("#tracker li.pip").removeClass("active");
						isPlaying = false;
						this.innerHTML = "Start it up!";
					}
				});


				// Function to iterate forward
				function playBeat() {
					// Turn off all lights on the tracker's row
					$("#tracker li.pip").removeClass("active");
					// Stop all sounds
					$("audio").each(function(){
						this.pause();
						this.currentTime = 0.0;
					});
					// Light up the tracker on the current pip
					$("#tracker li.pip.col_" + pipTracker).addClass("active");
					// Find each active beat, play it
					$(".soundrow[id^=control] li.pip.active.col_" + pipTracker).each(function(i){
						document.getElementById($(this).data('sound_id')).play();
					});
					// Move the pip forward
					pipTracker = (pipTracker + 1) % 16;
				}
			});

			// Run on window loaded
			$(window).bind('load',function(){
			});
		</script>
	</body>
</html>
