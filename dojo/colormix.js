// Color Mixer
// Brian Arnold
// MIT licensed, though I doubt you'd actually want to take any of it yet.

// Dojo Requires
dojo.require('dojo.Stateful');
dojo.require('dijit.ColorPalette');
dojo.require('dijit.form.Button');
dojo.require('dijit.form.HorizontalSlider');
dojo.require('dijit.form.TextBox');
dojo.require('dijit.layout.BorderContainer');
dojo.require('dijit.layout.ContentPane');

// Variables
// (I realize global isn't a great idea, but this is just a simple demo)
var controls, left, right, slider, result, output;

// Functions
// rndCol: Just a simple way to get a random color
function rndCol() {
	var i, cols = new Array(3);

	for (i = 0; i < 3; i++) {
		cols[i] = Math.floor(Math.random() * 256);
	}

	return dojo.colorFromArray(cols);
}

// colChange: Will be used in a watch callback for left and right colors
function colChange(prop, oldCol, newCol) {
	// Set the node's background
	var node = this.get('displayNode'), newColHex = newCol.toHex();

	// If we have the same color, we can just get out
	if (oldCol && newCol && oldCol.toHex() === newColHex) return;

	// If we have a node, work it
	if (node) {
		node.innerHTML = newColHex
		node.style.backgroundColor = newColHex;
	}
}

// colChangeAndMix: A slight tweak to not just change, but kick off a mix
function colChangeAndMix(prop, oldCol, newCol) {
	// Run the colChange first
	colChange.apply(this, arguments);

	// Kick off a mix
	mixCols(slider.get('value'));
}

// mixCols: Just something to mix the two colors if they exist
function mixCols(val) {
	var leftCol = left.get('color'),
		rightCol = right.get('color');

	if (!leftCol || !rightCol) {
		// Just dump out for now
		return;
	}

	output.innerHTML = val;

	// TODO Animate
	result.set('color', dojo.blendColors(leftCol, rightCol, val));
}

// Ready, do somethin'
dojo.ready(function(){
	// Set up a few Stateful items
	left = new dojo.Stateful({
		color: null,
		palette: new dijit.ColorPalette({}, 'leftPal'),
		paletteNode: dojo.byId('leftPal'),
		displayNode: dojo.byId('leftCol')
	});
	right = new dojo.Stateful({
		color: null,
		palette: new dijit.ColorPalette({}, 'rightPal'),
		paletteNode: dojo.byId('rightPal'),
		displayNode: dojo.byId('rightCol')
	});
	result = new dojo.Stateful({
		color: null,
		displayNode: dojo.byId('resultCol')
	});

	controls = new dijit.layout.BorderContainer({}, 'controls');

	var lp = new dijit.layout.ContentPane({
		id: 'leftControls',
		region: 'left'
	});
	controls.addChild(lp);
	var btl = new dijit.form.Button({
		label: "Randomize Left Color",
		onClick: function () {
			left.set('color', rndCol());
		}
	});
	lp.containerNode.appendChild(btl.domNode);

	var rp = new dijit.layout.ContentPane({
		id: 'rightControls',
		region: 'right'
	});
	controls.addChild(rp);
	var btr = new dijit.form.Button({
		label: "Randomize Right Color",
		onClick: function () {
			right.set('color', rndCol());
		}
	});
	rp.containerNode.appendChild(btr.domNode);

	var ft = new dijit.layout.ContentPane({
		id: 'footer',
		region: 'bottom'
	});
	controls.addChild(ft);

	// Build a slider
	slider = new dijit.form.HorizontalSlider({
		id: 'slider',
		value: 0.5,
		minimum: 0,
		maximum: 1,
		//intermediateChanges: true,
		onChange: mixCols
	});
	ft.containerNode.appendChild(slider.domNode);

	// Show some info
	output = dojo.create('span');
	ft.containerNode.appendChild(dojo.create('span', {innerHTML: 'Slider value: '}));
	ft.containerNode.appendChild(output);

	// Set up some events
	left.watch('color', colChangeAndMix);
	right.watch('color', colChangeAndMix);
	result.watch('color', colChange);

	// Tweak the left and right
	dojo.forEach([left, right], function (item, i) {
		var pal = item.get('palette'),
			palNode = item.get('paletteNode');
			disp = item.get('displayNode');

		// Mmm, events
		dojo.connect(disp, "onclick", function () {
			vis = palNode.style.visibility;
			palNode.style.visibility = vis === 'visible' ? 'hidden' : 'visible';
		});
		dojo.connect(pal, 'onChange', function (col) {
			palNode.style.visibility = 'hidden';
			item.set('color', dojo.colorFromHex(col));
		});

		// Set up some initial display
		palNode.style.visibility = 'hidden';
		item.set('color', rndCol());
	});

	// Get the show on the road
	//dojo.byId('controls').appendChild(controls.domNode);
	controls.startup();
	dojo.byId('loading').style.display = 'none';
	dojo.byId('content').style.display = '';
}); // dojo.ready

// Vim settings, whee
// vim: set sw=4 ts=4 noet:
