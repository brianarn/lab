/*
* jquery.LOGO.js
* Copyright (c) 2009 Brian Arnold
* Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
* Design pattern courtesy of http://www.learningjquery.com/2007/10/a-plugin-development-pattern
*/

// Wrap the plugin in a closure, be a proper jQuery citizen
(function($) {
	// ===== MAIN PLUGIN CODE =====
	$.fn.LOGO = function(options) {
		// Set up our default options, extending off our base
		var opts = $.extend({}, $.fn.LOGO.defaults, options);

		// LOGO-ify this bad boy!
		return this.each(function() {
			// Convenience self-reference
			$this = $(this);
			
			// Element-specific options, courtesy of the Metadata plugin
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

			// Create a parent wrapper for our canvases - we'll want to hang onto that.
			var $wrapper = $('<div class="logowrapper" style="position: relative; width:'+o.width+'px; height:'+o.height+'px;" />');

			// Create our canvases, append them in
			var $turtle  = $('<canvas class="turtle"  width="'+o.width+'" height="'+o.height+'" style="position: absolute; top:0px; left:0px;" />');
			var $drawing = $('<canvas class="drawing" width="'+o.width+'" height="'+o.height+'" style="position: absolute; top:0px; left:0px;" />');
			$wrapper.append($turtle).append($drawing);
			$this.append($wrapper);
			
			// Make a control area, append it in
			if (o.controls) {
				var $controls = $('<ul class="controls" />');
				$controls.append('<li>Junk Control</li>');
				$controls.append('<li>Junk Control</li>');
				$controls.append('<li>Junk Control</li>');
				$this.append($controls);
			} // if (o.controls)
		}); // return this.each(function()
	}; // $.fn.LOGO = function(options)

	// ===== DEFAULTS =====
	$.fn.LOGO.defaults = {
		'width':    500,
		'height':   500,
		'controls': true
	};

	// ===== FUNCTIONS =====
	function debug($obj) {
		if (window.console && window.console.log)
		window.console.log('LOGO selection count: ' + $obj.size());
	};
})(jQuery);