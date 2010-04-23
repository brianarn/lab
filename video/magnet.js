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
    /*
    curctx.fillStyle = "rgba(0,0,0,0.5)";
    curctx.fillRect(0,0,cursor.width,cursor.height);
    */
    imgd = curctx.getImageData(0, 0, cursor.width, cursor.height);
    for (y = 0; y < cursor.height; ++y) {
      for (x = 0; x < cursor.width; ++x) {
        i = (y * cursor.height + x) * 4;
        /*
        imgd.data[i+0] = (imgd.data[i+0] + 127) % 256; //R
        imgd.data[i+1] = (imgd.data[i+1] + 127) % 256; //G
        imgd.data[i+2] = (imgd.data[i+2] + 127) % 256; //B
        imgd.data[i+0] = (Math.sin(imgd.data[i+0]) * 127 + 127);
        imgd.data[i+1] = (Math.sin(imgd.data[i+1]) * 127 + 127);
        imgd.data[i+2] = (Math.sin(imgd.data[i+2]) * 127 + 127);
        */
        imgd.data[i+0] = 255 - imgd.data[i+0];
        imgd.data[i+1] = 255 - imgd.data[i+1];
        imgd.data[i+2] = 255 - imgd.data[i+2];
        /*
        imgd.data[i+3] = (
          255 - Math.abs(
            ((x + y) / cursor.width) - 1
          ) * 255
        );
        imgd.data[i+3] = (
          Math.sin(
            (1 - Math.abs(x / cursor.width + y / cursor.height - 1)) * Math.PI
          )
        );
0        */
        // Fake a circle
        if (Math.sqrt(
            Math.pow(Math.abs(x - cursor.width /2), 2)
            + Math.pow(Math.abs(y - cursor.height /2), 2)
            ) < Math.min(cursor.width/2, cursor.height/2)
        ) {
          imgd.data[i+3] = Math.sin(
            (
              1.0 - (
                Math.abs(x / cursor.width - 0.5)
                + Math.abs(y / cursor.height - 0.5)
              )
            ) * Math.PI / 2
          ) * 255;
        } else {
          imgd.data[i+3] = 0; // Transparent
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

    console.log('DOMContentLoaded');

    // Get some DOM references
    vid = document.getElementById('src');
    base = document.getElementById('base');
    cursor = document.getElementById('cursor');
    result = document.getElementById('result');
    basectx = base.getContext('2d');
    curctx = cursor.getContext('2d');
    resctx = result.getContext('2d');

    // Apply a clip to the cursor
    /*
    curctx.beginPath();
    curctx.arc(
      cursor.width / 2,
      cursor.height / 2,
      Math.min(cursor.width / 2, cursor.height / 2),
      0, Math.PI * 2,
      true
    );
    curctx.clip();
    */

    // Mute the video before I go nuts
    vid.muted = true;

    // Hook some events onto the video
    vid.addEventListener('loadedmetadata', function(e) {
      console.log('vid loadedmetadata');

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
      console.log('vid play');
      rtimer = setInterval(refreshVid, 1000/FPS);
      mtimer = setInterval(magnetize, 1000/FPS*2);
    }, false); // vid play

    vid.addEventListener('pause', function(e) {
      // Video is being paused, so stop the refreshser
      console.log('vid pause');
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
    // And update display
    document.getElementById('mouseX').innerHTML = mouseX;
    document.getElementById('mouseY').innerHTML = mouseY;
  }, false); // DOM onmousemove
})(window,document);
// vim: set sw=2 ts=2 et:
