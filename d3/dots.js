// Intentionally not wrapping in an IIFE so I can poke around in the console
// This is an experiment after all, and not meant to be production-ready dot drawing code

// Default values
var width  = 750;
var height = 400;
var dots = [];

var options = {
  radius : 10,
  numDots : 1000
};

// Create our baseline SVG element
var svg = d3.select('#dots');//.append('svg');
svg.attr({
  width : width,
  height : height
});

// Draw the dots
function drawDots () {
  var dotCircles = svg.selectAll('.dot').data(dots, function (dot) { return dot.id; });

  // Get rid of dots no longer in the data
  dotCircles.exit().remove();

  // Inserting
  dotCircles.enter()
    .append('circle')
    .attr({
      'class' : 'dot',
      r : options.radius,
      cx : function (dot) { return dot.x },
      cy : function (dot) { return dot.y },
    })
    .style('fill', function (dot) { return dot.color; });
}

// Scale to our width
var xScale = d3.scale.linear().domain([0,1]).range([0, width]);
var yScale = d3.scale.linear().domain([0,1]).range([0, height]);
var rainbowScale = d3.scale.linear().domain([0, 1/6, 2/6, 3/6, 4/6, 5/6, 1]).range(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']);
var scaleStyle = 'horizontalRainbow';
function colorScale (x, y) {
  switch (scaleStyle) {
    case 'horizontalRainbow':
      return rainbowScale(x);
      break;
    case 'verticalRainbow':
      return rainbowScale(y);
      break;
    default:
      return rainbowScale(Math.random());
  }
}

var id = 0;
function addDot() {
  var x = Math.random();
  var y = Math.random();
  var color = colorScale(x, y);

  var dot = {
    id : id++,
    x : xScale(x),
    y : yScale(y),
    color : color
  };

  dots.push(dot);

  if (dots.length > options.numDots) {
    dots = dots.slice(-options.numDots);
  }
  drawDots();
}

var stopAdding = false;

var timer = setInterval(function () {
  if (stopAdding) { clearInterval(timer); return; }
  addDot();
}, 0);

// Mmm, events
$('#sliders').on('change', 'input[type=range]', function (e) {
  var id = this.id
  var value = parseInt(this.value, 10);
  options[id] = value;
  $('#' + id + '-count').text(value);
});
$('#pattern').on('change', function (e) {
  scaleStyle = this.value;
});
$('#flush-dots').on('click', function (e) {
  dots = [];
});
