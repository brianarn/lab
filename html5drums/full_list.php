<?
// A function to process and echo out a list
function scanForSounds($path) {
	// Set up a return value
	$return = '';

	// Open up the directory
	if ($handle = opendir($path)) {
		// Start it up
		$return = '<ul>';
		while (($file = readdir($handle)) !== false) {
			// Skip anything hidden
			if (substr($file, 0, 1) == '.') continue;
			$fullpath = "$path/$file";
			$soundid = basename($file, '.wav');
			if (is_dir($fullpath)) {
				// Note it
				$return .= "<li class=\"dir\">$fullpath";
				// Scan this path, add it in
				$return .= scanForSounds($fullpath);
				// Wrap it up
				$return .= '</li>';
			} else {
				// If it's not a .wav, skip on
				if (substr($file, -4) != '.wav') continue;
				// Set it up as a full-on audio object
				$return .= "<li class=\"sound\"><span>$fullpath:</span> <audio id=\"$soundid\" src=\"$fullpath\" autoload controls></li>";
			} // if (is_dir($file))
		} // while (($file = readdir($handle)) !== false)
		// Close it up
		$return .= '</ul>';
	} else {
		$return = "<span class=\"error\">Unable to open \"$path\"</span>";
	} // if ($handle = opendir($path))
	// Hand it back
	return $return;
}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>HTML5 Drum Kit</title>
		<!-- CSS -->
		<link type="text/css" rel="stylesheet" href="reset.css" />
		<link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/redmond/jquery-ui.css" />
		<link type="text/css" rel="stylesheet" href="html5drums.css" />
		<!-- Scripts -->
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7/jquery.min.js"></script>
		<!--[if lte IE 8]>
		<script src="html5.js" type="text/javascript"></script>
		<![endif]-->
	</head>
	<body>
		<header>
			<h1>HTML5 Drum Kit</h1>
		</header>
		<section id="content">
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
				console.debug("DOM Ready!");
			});

			// Run on window loaded
			$(window).bind('load',function(){
				console.debug("Window Loaded!");
			});
		</script>
	</body>
</html>
