var pointCount = 50;
var points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Add a single point
  points.push(new Point());
}

function Point() {
  // Starting location and velocity
  this.location = createVector(windowWidth / 2, windowHeight / 2);
  this.velocity = p5.Vector.random2D();
  this.velocity.mult(random(1,10));

  // Other properties
  this.visible = true;
  this.fade = false;

  // Rendering attributes
  this.size = random(20, 80);
  this.color = color(
    floor(random(256)),
    floor(random(256)),
    floor(random(256))
  );
}

Point.prototype.update = function () {
  // If we're out of the window, flag as not visible,
  // to be reaped before render.
  if (this.location.y > windowHeight + this.size) {
    this.visible = false;
    return;
  }

  if (this.fade) {
    var oldColor = this.color;
    this.color = color(
      oldColor._getRed(),
      oldColor._getGreen(),
      oldColor._getBlue(),
      oldColor._getAlpha() - 5
    );

    // Once we go clear, we're no longer visible
    if (this.color._getAlpha() === 0) {
      this.visible = false;
      return;
    }
  }

  // Apply gravitational acceleration to our velocity and framerate,
  // then apply velocity to our location.
  this.velocity.add(0, 9.8 / frameRate());
  this.location.add(this.velocity);
};

Point.prototype.render = function () {
  // Guard check: If we're not visible, don't waste time
  if (!this.visible) { return; }

  // Set our fill and draw a circle
  push();

  // Draw the circle
  fill(this.color);
  stroke(0, 0, 0, this.color._getAlpha());
  ellipse(this.location.x, this.location.y, this.size, this.size);

  // Draw velocity
  // Modified from
  // http://p5js.org/examples/examples/Simulate_SmokeParticles.php
  var loc = this.location;
  var v = this.velocity;

  translate(loc.x,loc.y);
  rotate(v.heading());

  var len = v.mag() * 2;
  var arrowsize = len / 4;
  stroke(0);
  line(0,0,len,0);
  line(len, 0, len - arrowsize, arrowsize / 2);
  line(len, 0, len - arrowsize, -arrowsize / 2);

  // Reset
  pop();
};

function updatePoints () {
  var numToAdd = 1;
  // Reap out points that are no longer visible
  points = points.filter(function (point) {
    return point.visible;
  });

  // If we're under count, add a new point.
  // Just one, though. This will have a slow build effect at the start.
  if (points.length < pointCount) {
    for (var i = 0; i < numToAdd; i++) {
      points.push(new Point());
    }
  }

  // Roughly once per second,
  points.forEach(function (point) {
    point.update();
    point.render();
  });
}

function updateText() {
  fill(0);
  textSize(32);
  text('Points: ' + points.length, 10, 30);
  text('Frame rate: ' + floor(frameRate()), 10, 70);
}

function draw() {
  background(255);
  updatePoints();
  updateText();
}
