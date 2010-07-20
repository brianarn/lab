/*
 * Trig Colorings
 * Copyright (c) 2010 Brian Arnold
 * Software licensed under MIT license, see http://www.randomthink.net/lab/LICENSE
 *
 * Just a little experiment with setting pixels based on trig functions
 */

// Closures make for clean spaces
(function(win,doc,undef){
  // == Variables and Constants
  var canvas, ctx, imgd, iter;

  const
    FPS = 10,
    INC = 1000,
    CX = 100,
    CY = 100,
    TRIGFUNC = [
      function(v) { return Math.sin(v) * 127 + 127 }, // Red
      function(v) { return Math.cos(v) * 127 + 127 }, // Green
      //function(v) { return Math.abs(Math.tan(v)) % 256 }, // Blue
      //function(v) { return (Math.sin(v) + Math.cos(v)) * 127 + 127; },
      function(v) { return v % 256 },
      function(v) { return 255; } // Alpha
    ]
  ; // consts

  // Functions
  function scaleCanvas() {
    canvas.style.width  = win.innerWidth + 'px';
    canvas.style.height = win.innerHeight + 'px';
  }

  function draw() {
    var c, x, y, v, idx;

    // Do some trig!
    for (y = 0; y < CY; ++y) {
      for (x = 0; x < CX; ++x) {
        for (c = 0; c < 4; ++c) {
          idx = y * CY * 4 + x * 4 + c;
          v = TRIGFUNC[c](x+y+idx*iter/INC);
          if (x < 5 && y < 5) console.log("("+x+","+y+"): " + v);
          imgd.data[idx] = v;
        } // for (i = 0; i < 4; ++i)
      } // for (x = 0; x < CX; ++x)
    } // for (y = 0; y < CY; ++y)

    // Tweak our iterator
    iter = (iter + 1) % INC;

    // Write it back
    ctx.putImageData(imgd,0,0);
  }

  // == Events
  doc.addEventListener('DOMContentLoaded', function(){
    // Set up our canvas
    canvas = doc.getElementById('cols');
    canvas.width  = CX;
    canvas.height = CY;
    scaleCanvas();

    // Get the context and its image data
    ctx = canvas.getContext('2d');
    imgd = ctx.getImageData(0,0,CX,CY);
    iter = 0;

    // Courtesy of http://gist.github.com/360138
    setInterval((function loop() {
      draw();
      return loop;
    })(), 1000/FPS);
  }, false); // DOM Loaded

  // When the window resizes
  win.addEventListener('resize', scaleCanvas, false);
})(window,document);
// vim: set sw=2 ts=2 et:
