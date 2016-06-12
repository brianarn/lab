function setup () {
  createCanvas(400, 400, WEBGL);
}

function draw () {
  background(80);
  rotateX(frameCount * 0.1);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.001);


  // Draw the sides
  plane(50, 50);
  fill('red');
  beginShape();
  vertex(-50, -50, 0);
  vertex(-50, 50, 0);
  vertex(0, 0, 100);
  endShape();
  fill('blue');
  beginShape();
  vertex(-50, 50, 0);
  vertex(50, 50, 0);
  vertex(0, 0, 100);
  endShape();
  fill('green');
  beginShape();
  vertex(50, 50, 0);
  vertex(50, -50, 0);
  vertex(0, 0, 100);
  endShape();
  fill('black');
  beginShape();
  vertex(50, -50, 0);
  vertex(-50, -50, 0);
  vertex(0, 0, 100);
  endShape();
}
