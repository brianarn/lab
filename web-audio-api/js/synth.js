/**
 * calcFreq
 * Calculates frequency to use for a note, based on distance from
 * a root (in this case, A4 = 440hz).
 * See the following for details:
 * http://www.phy.mtu.edu/~suits/NoteFreqCalcs.html
 *
 * @param steps
 * @returns {Number}
 */
function calcFreq(steps) {
  var TWELFTH = 1.05946309436;
  var ROOT = 440;

  return ROOT * Math.pow(TWELFTH, steps);
}

var notes = {
  'C4':  calcFreq(-9),
  'C#4': calcFreq(-8),
  'Db4': calcFreq(-8),
  'D4':  calcFreq(-7),
  'D#4': calcFreq(-6),
  'Eb4': calcFreq(-6),
  'E4':  calcFreq(-5),
  'F4':  calcFreq(-4),
  'F#4': calcFreq(-3),
  'Gb4': calcFreq(-3),
  'G4':  calcFreq(-2),
  'G#4': calcFreq(-1),
  'Ab5': calcFreq(-1),
  'A5':  calcFreq(0),
  'A#5': calcFreq(1),
  'Bb5': calcFreq(1),
  'B5':  calcFreq(2),
  'C5':  calcFreq(3),
  'C#5': calcFreq(4),
  'Db5': calcFreq(4),
  'D5':  calcFreq(5)
};

// Make some web audios
var ctx = new window.AudioContext();

// Master Gain for main volume control
masterGain = ctx.createGain();
masterGain.connect(ctx.destination);

// Volume Slider to adjust Master Gain
var volumeSlider = document.getElementById('volume-slider');
var volumeSetting = document.getElementById('volume-setting');
function updateVolume(e) {
  var value = volumeSlider.value;
  volumeSetting.innerHTML = value + '%';
  masterGain.gain.value = value / 100;
}
volumeSlider.addEventListener('input', updateVolume);
volumeSlider.addEventListener('change', updateVolume);
// I'm invoking the event handler once to forcibly adjust to whatever is coming
// in from DOM, so I don't have to keep two spots in sync.
updateVolume();

// What the keys maps to:
// For right now, this is a raw keycodes-to-notenames map.
// Eventually I'd want this more fleshed out. Probably.
var keyMap = {
  '90': 'C4',
  '83': 'C#4',
  '88': 'D4',
  '68': 'D#4',
  '67': 'E4',
  '86': 'F4',
  '71': 'F#4',
  '66': 'G4',
  '72': 'G#4',
  '78': 'A5',
  '74': 'A#5',
  '77': 'B5',
  '188': 'C5',
  '76': 'C#5',
  '190': 'D5'
};

// This object is basically a cheap Set of oscillators.
var keyOscillators = {};

// We'll be using a select element to determine types
var waveType = document.getElementById('wave-type');

// Handle our keypressings!
document.body.addEventListener('keydown', function (e) {
  // Check to see if we know this key
  var keyCode = e.keyCode;
  var noteName = keyMap[keyCode];
  if (!noteName) { return; }

  // Somehow this event fires rapidly, so see if we already have an oscillator,
  // and if so, we're not moving forward
  if (keyOscillators[keyCode]) { return; }

  // Get the actual note value
  var note = notes[noteName];

  // May as well say something
  console.log('Starting %s (%s)', noteName, note);

  // Create and start the oscillator
  var osc = ctx.createOscillator();
  osc.type = waveType.value;
  osc.frequency.value = note;
  osc.connect(masterGain);
  osc.start();
  keyOscillators[keyCode] = osc;
});
document.body.addEventListener('keyup', function (e) {
  // Look up info and see if we have an oscillator to shut down
  var keyCode = e.keyCode;
  var noteName = keyMap[keyCode];
  var osc = keyOscillators[keyCode];

  // If we do, close it out.
  if (osc) {
    console.log('Stopping %s (%s)', noteName, osc.frequency.value);
    delete keyOscillators[e.keyCode];
    osc.stop();
  }
});
