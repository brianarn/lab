/*
 * magnet.js
 * Copyright Brian Arnold 2010
 * MIT license, meaning you can do whatever
 *
 * Inspired by craftymind.com article, to achieve
 * an effect from my childhood that isn't so easily
 * achieved anymore
 */

// Give a hoot, don't pollute (the global space)
// with a few variables with minification in mind
(function(window,document,undefined){
  // Variables
  var vid      // Video DOM reference
    , base     // Base canvas DOM ref
    , basectx  // Base canvas 2d context
    , cursor   // Cursor canvas DOM ref
    , curctx   // Cursor canvas 2d context
    , result   // Result canvas DOM ref
    , resctx   // Result canvas 2d context
    , rtimer   // Video to canvas interval
    , mtimer   // Canvas altering interval
    , mouseX   // The mouse's current x position
    , mouseY   // The mouse's current y position
    , currad   // Cursor radius
  ;

  const
    FPS = 100 // General framerate
  ;

  // Functions

  // refreshVid: Just write the video to the base
  function refreshVid() {
    basectx.drawImage(vid, cursor.width/2, cursor.height/2);
  } // refreshVid

  // magnetize: Apply the effect
  function magnetize() {
    var resX    // Mouse X position relative to result
      , resY    // Mouse Y position relative to result
      , imgd    // Image data for the cursor
      , x, y, i // Indices for looping
      , rad     // Radius for use in alpha calc
      , r, g, b // For colors
    ;

    // Determine sampling position, centered on mouse
    resX = mouseX - result.offsetLeft;
    resY = mouseY - result.offsetTop;

    // Bounds check: No sense doing work if we're too far to be seen
    if ( (resX > vid.videoWidth )
      || (resX < 0)
      || (resY < 0)
      || (resY > vid.videoHeight ) ) {
      return;
    }

    // Snapshot into the cursor
    curctx.drawImage(
      base,           // The base image
      resX, resY,     // Where to start grabbing
      cursor.width,   // How wide to grab
      cursor.height,  // How tall to grab
      0, 0,           // Where to write to in target
      cursor.width,   // How wide to write
      cursor.height   // How tall to write
    );

    // Tweak the cursor
    imgd = curctx.getImageData(0, 0, cursor.width, cursor.height);
    for (y = 0; y < cursor.height; ++y) {
      for (x = 0; x < cursor.width; ++x) {
        i = (y * cursor.height + x) * 4;
        /*
        // Inverse
        imgd.data[i+0] = 255 - imgd.data[i+0];
        imgd.data[i+1] = 255 - imgd.data[i+1];
        imgd.data[i+2] = 255 - imgd.data[i+2];
        // Umm... something
        imgd.data[i+0] = (Math.sin(imgd.data[i+0]) * 127 + 127);
        imgd.data[i+1] = (Math.sin(imgd.data[i+1]) * 127 + 127);
        imgd.data[i+2] = (Math.sin(imgd.data[i+2]) * 127 + 127);
        */
        // Color shift
        r = imgd.data[i+1];
        g = imgd.data[i+2];
        b = imgd.data[i+0];
        imgd.data[i+0] = r;
        imgd.data[i+1] = g;
        imgd.data[i+2] = b;

        // Work out a circle with alpha
        rad = Math.sqrt(
          Math.pow(Math.abs(x - cursor.width /2), 2)
          + Math.pow(Math.abs(y - cursor.height /2), 2)
        );
        if (rad >= currad) {
          // Blank
          imgd.data[i+3] = 0;
        } else {
          imgd.data[i+3] = (
            1 - rad / Math.min(cursor.width/2, cursor.height/2)
          ) * 255;
        }
      } // for x
    } // for y
    curctx.putImageData(imgd, 0, 0);

    // Draw into the result
    resctx.drawImage(
      base,
      cursor.width / 2, cursor.height / 2,
      result.width,
      result.height,
      0, 0,
      result.width,
      result.height
    );
    resctx.drawImage(cursor, resX - cursor.width / 2, resY - cursor.width / 2);
  } // function magnetize

  // Events
  document.addEventListener('DOMContentLoaded', function(e) {

    // Get some DOM references
    vid = document.getElementById('src');
    base = document.getElementById('base');
    cursor = document.getElementById('cursor');
    result = document.getElementById('result');
    basectx = base.getContext('2d');
    curctx = cursor.getContext('2d');
    resctx = result.getContext('2d');
    currad = Math.min(cursor.width / 2, cursor.height / 2);

    // Mute the video before I go nuts
    vid.muted = true;

    // Hook some events onto the video
    vid.addEventListener('loadedmetadata', function(e) {
      // Using the metadata, resize some canvases
      // Width/height take cursor into account
      // Makes for cleaner mouseover without exceptions all over
      base.width    = vid.videoWidth + cursor.width;;
      base.height   = vid.videoHeight + cursor.height;;
      result.width  = vid.videoWidth;
      result.height = vid.videoHeight;
    }, false); // vid loadedmetadata

    // Set some events on the video
    vid.addEventListener('play', function(e) {
      // Video is playing, so kick up our refresher
      rtimer = setInterval(refreshVid, 1000/FPS);
      mtimer = setInterval(magnetize, 1000/FPS);
    }, false); // vid play

    vid.addEventListener('pause', function(e) {
      // Video is being paused, so stop the refreshser
      clearInterval(rtimer);
      clearInterval(mtimer);
    }, false); // vid pause

    // Exposing the video globally for testing on my part
    window.vid = vid;
  }, false); // DOMContentLoaded

  document.addEventListener('mousemove', function(e) {
    // Just update position
    mouseX = e.pageX;
    mouseY = e.pageY;
  }, false); // DOM onmousemove
})(window,document);
// vim: set sw=2 ts=2 et:
