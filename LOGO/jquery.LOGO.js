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
			// Convenience reference
			$this = $(this);
			
			// Element-specific options, courtesy of the Metadata plugin
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

			// Create our canvas, append it in
			$('<canvas width="'+o.width+'" height="'+o.height+'"></canvas>').appendTo($this);

		}); // return this.each(function()
	}; // $.fn.LOGO = function(options)

	// ===== DEFAULTS =====
	$.fn.LOGO.defaults = {
		'width':  500,
		'height': 500
	};

	// ===== FUNCTIONS =====
	function debug($obj) {
		if (window.console && window.console.log)
		window.console.log('LOGO selection count: ' + $obj.size());
	};
})(jQuery);