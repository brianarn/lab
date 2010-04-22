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
    , dtimer   // Canvas altering interval
  ;

  const
    FPS = 30 // General framerate
  ;

  // Functions

  // refreshVid: Just write the video to the base
  function refreshVid() {
    basectx.drawImage(vid,0,0);
  } // refreshVid

  // Events
  document.addEventListener('DOMContentLoaded', function(e) {

    console.log("DOMContentLoaded");

    // Get some DOM references
    vid = document.getElementById('src');
    base = document.getElementById('base');
    cursor = document.getElementById('cursor');
    result = document.getElementById('result');
    basectx = base.getContext('2d');
    curctx = cursor.getContext('2d');
    resctx = result.getContext('2d');

    // Hook some events onto the video
    vid.addEventListener('loadedmetadata', function(e) {
      var w, h;

      console.log("vid loadedmetadata");

      // Using the metadata, resize some canvases
      w = vid.videoWidth;
      h = vid.videoHeight;
      base.width    = w;
      base.height   = h;
      result.width  = w;
      result.height = h;
    }, false); // vid loadedmetadata

    // Set some events on the video
    vid.addEventListener('play', function(e) {
      // Video is playing, so kick up our refresher
      console.log("vid play");
      rtimer = setInterval(refreshVid, 1000/FPS);
    }, false); // vid play

    vid.addEventListener('pause', function(e) {
      // Video is being paused, so stop the refreshser
      console.log("vid pause");
      clearInterval(rtimer);
    }, false); // vid pause

    // Exposing the video globally for testing on my part
    window.vid = vid;
  }, false); // DOMContentLoaded

  document.addEventListener('mousemove', function(e) {
    console.log("MOUSEMOVED");
  }, false); // DOM onmousemove
})(window,document);
// vim: set sw=2 ts=2 et:
