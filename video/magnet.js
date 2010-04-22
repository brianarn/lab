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

  // Functions

  // 

  // Events
  document.addEventListener('DOMContentLoaded', function(e) {
    console.log("DOMContentLoaded");

    // Get some DOM references
    vid = document.getElementById('src');
    base = document.getElementById('base');
    cursor = document.getElementById('cursor');
    result = document.getElementById('result');

    vid.addEventListener('loadedmetadata', function(e) {
      console.log("Video metadata loaded");
    }, false); // vid loadedmetadata

    vid.addEventListener('play', function(e) {
      // Video is playing, so kick up our refresher
    }, false);
  }, false); // DOMContentLoaded
})(window,document);
// vim: set sw=2 ts=2 et:
