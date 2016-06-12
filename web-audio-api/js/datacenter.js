// Intentional globals because it makes it easier to play in the console
// woooooo
// still use var tho, not a heathen

// Our play DOM node, which should be safe w/o a DOMready because it is
var playStatus = document.getElementById('playStatus');
var playButton = document.getElementById('playDatacenter');
var playButtonIcon = playButton.querySelector('i');
var playing = false;

var context = new (window.AudioContext || window.webkitAudioContext)();

// Master Gain, because I don't want things too loud
masterGain = context.createGain();
masterGain.gain.value = 0;
masterGain.connect(context.destination);

// Convolver!
convolver = context.createConvolver();
convolver.connect(masterGain);

// Noises
/*
var whiteGain = context.createGain();
whiteGain.gain.value = 0;
whiteGain.connect(convolver);
var whiteNoise = context.createWhiteNoise();
whiteNoise.connect(whiteGain);
*/

// For now, play the brown noise aloud, but not the pink noise
var brownGain = context.createGain();
brownGain.gain.value = 1;
brownGain.connect(convolver);
var brownNoise = context.createBrownNoise();
brownNoise.connect(brownGain);

var pinkGain = context.createGain();
pinkGain.gain.value = 0;
pinkGain.connect(convolver);
var pinkNoise = context.createPinkNoise();
pinkNoise.connect(pinkGain);

// Oscillator!
var oscGain = context.createGain();
oscGain.gain.value = 0.7;
oscGain.connect(convolver);
var oscillator = context.createOscillator();
// Magic numbers due to ... messing around, nothing scientific
oscillator.frequency.value = 200;
oscillator.detune.value = 20;
oscillator.connect(oscGain);
oscillator.start();

// Grab IR
var irPath = 'sounds/carpark_balloon_ir_mono_24bit_44100.mp3';
var request = new XMLHttpRequest();
request.open('GET', irPath, true);
request.responseType = 'arraybuffer';
request.onload = function () {
  context.decodeAudioData(request.response, function (buffer) {
    convolver.buffer = buffer;
    playButton.removeAttribute('disabled');
    playButtonIcon.classList.remove('glyphicon-time');
    playButtonIcon.classList.add('glyphicon-play');
    playStatus.innerHTML = 'Ready';
  });
};
request.send();

playButton.addEventListener('click', function (e) {
  e.preventDefault();

  if (playing) {
    masterGain.gain.value = 0;
    playStatus.innerHTML = 'Ready';
  } else {
    masterGain.gain.value = 0.25;
    playStatus.innerHTML = 'Playing';
  }

  playButtonIcon.classList.toggle('glyphicon-play');
  playButtonIcon.classList.toggle('glyphicon-pause');

  playing = !playing;
});

/*
var playBrown = document.getElementById('playBrown');
var playingBrown = false;
playBrown.addEventListener('click', function (e) {
  e.preventDefault();

  if (playingBrown) {
    brownNoise.disconnect();
  } else {
    brownNoise.connect(masterGain);
  }

  playingBrown = !playingBrown;
});
*/

/*
console.log('Starting fetch');
fetch('sounds.json').then(function (res) {
  return res.json();
}).then(function (soundsList) {
  console.log('fetch complete, creating bufferloader');
  bufferLoader = new BufferLoader(context, soundsList, function (bufferList) {
    console.log('Buffers loaded');
  });
  debugger;
});
*/

