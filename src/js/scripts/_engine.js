/*

let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let double_notes = notes.concat(notes);


let coord = 0;
let key_pattern = [true, false, true, false, true, true, false, true, false, true, false, true, true, false, true, false, true, true, false, true, false, true, false, true] // true - нижняя, false - верхняя
// тон тон полутон тон тон тон - мажор
// тон полутон тон тон полутон тон  - минор

let majorScale = [0, 2, 4, 5, 7, 9, 11];
let minorScale = [0, 2, 3, 5, 7, 8, 10];
let requiredScale = []
let resultField;
let output;

let currentOrder = [];

let root = 'C';
let queryScale = 'Major';

function getRoot(attr) {
  root = attr.innerHTML;
}

function getScale(attr) {
  queryScale = attr.innerHTML;
}

function startNote(attr) { // defines the array with correct start point
  currentOrder.length = 0;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i] == attr) {
      currentOrder.push(notes[i]);
      for (let n = [i]; n < 12; n++) {
        if (notes[n] == attr) {
          continue
        } else {
          currentOrder.push(notes[n]);
        }
      }
    }
  }

  for (let k = 0; k < notes.length; k++) {
    if (notes[k] !== attr) {
      currentOrder.push(notes[k]);
    } else {
      break
    }
  }
}

function makeScale(attr, attrTwo) { // defines the scale in accordance with the rootnote

  requiredScale.length = 0;

  for (let n = 0; n < attr.length; n++) {
    for (let i = 0; i < attrTwo.length; i++) {
      if (n == attrTwo[i]) {
        requiredScale.push(attr[n]);
      }
    }
  }
}

// --------- progressions ----------

let majorProgression;
let minorProgression;
let subDominant;
let prog_root;
let dominant;
let basicChords = [];
let thirdStep;
let basicChordField;
let diatonicChordField;
let diatonicText;
let minored = [];

basicChordField = document.querySelector(".progression_chords_basic_item");
diatonicChordField = document.querySelector(".progression_chords_diatonic_item");

function findDiatonic(attr, attrTwo) {
  basicChords.length = 0;
  if (attrTwo == 'Major') {

    prog_root = attr[0];
    subDominant = attr[3];
    dominant = attr[4];
    diminishedChord = attr[6];
    basicChords.push(attr[1], attr[2], attr[5]);
    basicChords.join(' ');

  } else if (attrTwo == 'Minor') {

    prog_root = attr[0];
    thirdStep = attr[2]
    subDominant = attr[5];
    dominant = attr[6];
    diminishedChord = attr[1];
    basicChords.push(attr[3], attr[4]);
    basicChords.join(' ');
  }
}

function printDiatonic(attr) {
  minored = [];

  if (queryScale == 'Major') {
    diatonicText = 'root: ' + root + "<br>" + 'subdominant: ' + subDominant + "<br>" + 'dominant: ' + dominant;
    attr.forEach(function(item) {
      item = item + 'm';
      minored.push(item)
    });
    diminishedChord = diminishedChord + 'dim';
    minored.push(diminishedChord);
    minored = minored.join(' ');
    basicChordField.innerHTML = minored;
    diatonicChordField.innerHTML = diatonicText;

  } else if (queryScale == 'Minor') {
    attr.forEach(function(item) {
      item = item + 'm';
      minored.push(item)
    });
    diminishedChord = diminishedChord + 'dim';
    minored.push(diminishedChord);
    minored = minored.join(' ');
    diatonicText = 'root: ' + root + 'm' + "<br>" + 'third: ' + thirdStep
    + '<br>' + 'subdominant: ' + subDominant + "<br>" + 'dominant: ' + dominant;
    basicChordField.innerHTML = minored;
    diatonicChordField.innerHTML = diatonicText;
  }
}

// --------- progressions end ----------

function printResults(attr) {
  resultField = document.querySelector('.result_output');
  output = attr.join('');
  resultField.innerHTML = output;
}

let rootNote = document.querySelectorAll('.select_root_item_name');

rootNote.forEach.call(rootNote, function(el) { //gets the root note
  el.addEventListener('click', function(e) {
    let previous = document.querySelector('.active');
    previous.classList.remove('active');
    this.classList.add('active');
    getRoot(this);
    finalResult()
    findDiatonic(requiredScale, queryScale);
    printDiatonic(basicChords);
    rightKeys()
    render(keys, key_pattern);
  })
});

let scale = document.querySelectorAll('.select_scale_item_name');

scale.forEach.call(scale, function(el) { //gets the requested scale
  el.addEventListener('click', function(e) {
    let last = document.querySelector('.active_scale');
    last.classList.remove('active_scale');
    this.classList.add('active_scale');
    getScale(this);
    finalResult();
    findDiatonic(requiredScale, queryScale);
    printDiatonic(basicChords);
  })
});

function finalResult() {
  startNote(root); // decision

  if (queryScale == 'Major') {
    makeScale(currentOrder, majorScale)
  } else {
    makeScale(currentOrder, minorScale)
  }
  printResults(requiredScale);
}

finalResult();
findDiatonic(requiredScale, queryScale);
printDiatonic(basicChords);


// canvas

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
// fixing blurry glitch

ctx.scale(5, 5)

let keys = []; // those to be chosen

function rightKeys (){

  double_notes.forEach((item, i) => {
    if (requiredScale.includes(item)) {
      return keys.push(true);
    } else {
      return keys.push(false);
    }
  });

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}





let render = (attr, attr_two) => { // attr_one - массив keys, отображающий гамму, attr_two - технический паттерн

  coord = 10;

  for (let i = 0; i < attr.length; i++) {
    coord += 10;
    ctx.lineWidth = '0.4'

    if (attr_two[i] == true) {
      ctx.globalCompositeOperation = "destination-over";

      if (attr[i] == true && i !== 4 && i !== 11 && i !== 16) {
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';
        ctx.fillRect(coord, 20, 8, 50);
        ctx.strokeRect(coord, 20, 8, 50);
      } else if (attr[i] == false && i !== 4 && i !== 11 && i !== 16) {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white'
        ctx.strokeRect(coord, 20, 8, 50);
        ctx.fillRect(coord, 20, 8, 50);
      } else if (attr[i] == false && i == 4 || i == 11 || i == 16) {
        coord -= 1;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white'
        ctx.strokeRect(coord, 20, 8, 50);
        ctx.fillRect(coord, 20, 8, 50);
        coord -= 2;
      } else if (attr[i] == true && i == 4 || i == 11 || i == 16) {
        coord -= 1;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'red'
        ctx.strokeRect(coord, 20, 8, 50);
        ctx.fillRect(coord, 20, 8, 50);
        coord -= 2;
      }
    } else {
      ctx.globalCompositeOperation = "source-over";

      if (attr[i] == true && i !== 4) {
        coord -= 6;
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';
        ctx.fillRect(coord, 20, 6, 35);
        ctx.strokeRect(coord, 20, 6, 35);
        coord -= 6;
      } else {
        coord -= 6;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white'
        ctx.strokeRect(coord, 20, 6, 35);
        ctx.fillRect(coord, 20, 6, 35);
        coord -= 6
      }
    };
  };
};

*/
