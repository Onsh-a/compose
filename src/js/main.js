const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// тон тон полутон тон тон тон - мажор
// тон полутон тон тон полутон тон  - минор

let majorPattern = [0, 2, 4, 5, 7, 9, 11];
let minorPattern = [0, 2, 3, 5, 7, 8, 10];

let sortedArr = []; // служебные массивы
let tempArr = [];

let scale = [];

// default settings
// const settings = {
// 	root: 'C',
// 	pattern: 'major',
// 	instrument: 'guitar',
// }

var root = 'C';
var pattern = 'major';
var instrument = 'guitar';

let rootSelect = document.querySelectorAll('.select_root_item_name');
let patternSelect = document.querySelectorAll('.select_scale_item_name');
let instrumentSelect = document.querySelectorAll('.select_instrument_item_name');
let scaleField = document.querySelector('.result_output');
let diatonicChordField = document.querySelector('.progression_chords_diatonic_item');
let basicChordField = document.querySelector('.progression_chords_basic_item');


rootSelect.forEach((item, i) => { // main function from rootnote
	return item.addEventListener('click', (e) => {
		root = item.innerHTML;
		classManagement();
		item.classList.add('active');
		generateArrWithRightStartPoing(root);
		buildScale(sortedArr, pattern);
		decideOnDiatonic(scale, pattern);
		canvasSetup(scale);
	})
});

patternSelect.forEach((item, i) => { // main function from scale type
	return item.addEventListener('click', (e) => {
		pattern = item.innerHTML.toLowerCase();
		classManagementScale();
		item.classList.add('active_scale');
		generateArrWithRightStartPoing(root);
		buildScale(sortedArr, pattern);
		decideOnDiatonic(scale, pattern);
		canvasSetup(scale);
	})
});

instrumentSelect.forEach((item, i) => { // main function from instrument type
	return item.addEventListener('click', (e) => {
		instrument = item.innerHTML.toLowerCase();
		classManagementInstrument();
		item.classList.add('active_instrument');
		generateArrWithRightStartPoing(root);
		buildScale(sortedArr, pattern);
		decideOnDiatonic(scale, pattern);
		canvasSetup(scale);
	})
});

function classManagement() {
	let previous = document.querySelector('.active');
	previous.classList.remove('active')
}

function classManagementScale() {
	let prev = document.querySelector('.active_scale');
	prev.classList.remove('active_scale')
}

function classManagementInstrument() {
	let prev = document.querySelector('.active_instrument');
	prev.classList.remove('active_instrument')
}

function generateArrWithRightStartPoing(attr) { // attr - current rootnote
	sortedArr.length = 0;
	tempArr.length = 0
	let counter = 0;
	notes.forEach((item, index) => {
		if (item == attr) {
			return counter = index;
		}
	})
	notes.forEach((item, index) => {
		if (index >= counter) {
			return sortedArr.push(item)
		} else if (index < counter) {
			return tempArr.push(item)
		}
	})
	sortedArr = sortedArr.concat(tempArr);
}

function buildScale(attr, pat) { // attr - arr with right start point + pat - type of scale
	if (pat == 'major') {
		scale = sortedArr.filter((item, index) => {
			if (majorPattern.includes(index)) {
				return item;
			}
		})
	} else if (pat == 'minor') {
		scale = sortedArr.filter((item, index) => {
			if (minorPattern.includes(index)) {
				return item;
			}
		})
	}
	scaleField.innerHTML = scale.concat(scale[0]).join('');
}

function decideOnDiatonic(attr, pat) { // attr - current scale + pat - type of scale
	let diatonicChords = [];
	let basicChords = [];
	let majorDiatonic = [0, 3, 4];
	let minorDiatonic = [0, 2, 5, 6];

	if (pat == 'major') {
		attr.forEach((item, index) => {
			if (majorDiatonic.includes(index)) {
				diatonicChords.push(item)
			} else {
				basicChords.push(item);
			}
		});

		basicChordsText = basicChords.map((item, index) => { // visual adjustments
			if (index == 0) {
				return item = 'II: ' + item + 'm' + '<br>'
			} else if (index == 1) {
				return item = 'III: ' + item + 'm' + '<br>'
			} else if (index == 2) {
				return item = 'VI: ' + item + 'm' + '<br>'
			} else if (index == 3) {
				return item = 'VII: ' + item + 'dim' + '<br>'
			}
		});

		diatonicChordsText = diatonicChords.map((item, index) => { // visual adjustments
			if (index == 0) {
				return item = 'root: ' + item + '<br>'
			} else if (index == 1) {
				return item = 'IV: ' + item + '<br>'
			} else if (index == 2) {
				return item = 'V: ' + item + '<br>'
			}
		})

	} else if (pat == 'minor') {
		attr.forEach((item, index) => {
			if (minorDiatonic.includes(index)) {
				diatonicChords.push(item)
			} else {
				basicChords.push(item);
			}
		});

		basicChordsText = basicChords.map((item, index) => { // visual adjustments
			if (index == 0) {
				return item = 'II: ' + item + 'dim' + '<br>'
			} else if (index == 1) {
				return item = 'IV: ' + item + 'm' + '<br>'
			} else if (index == 2) {
				return item = 'V: ' + item + 'm' + '<br>'
			}
		});

		diatonicChordsText = diatonicChords.map((item, index) => { // visual adjustments
			if (index == 0) {
				return item = 'root: ' + item + 'm' + '<br>'
			} else if (index == 1) {
				return item = 'III: ' + item + '<br>'
			} else if (index == 2) {
				return item = 'VI: ' + item + '<br>'
			} else if (index == 3) {
				return item = 'VII: ' + item + '<br>'
			}
		})


	}
	diatonicChordField.innerHTML = diatonicChordsText.join('');
	basicChordField.innerHTML = basicChordsText.join('');
}

// ======================= canvas settings ========================

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

let key_pattern = [true, false, true, false, true, true, false, true, false, true, false, true] // true - нижняя, false - верхняя
let double_notes = notes //.concat(notes);
let keys = []; // those to be chosen

let guitarStrings = [
	['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'], // first
	['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'], // second
	['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'], // third
	['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
	['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
	['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#']
]

let notesOnString = [ //array with notes on each string
	[],
	[],
	[],
	[],
	[],
	[]
];

let isToRender = [ // matrix of notes on the fretboard
	[],
	[],
	[],
	[],
	[],
	[]
];

ctx.scale(5, 5)

function rightKeys(attr) {

	double_notes.forEach((item, i) => {
		if (attr.includes(item)) {
			return keys.push(true);
		} else {
			return keys.push(false);
		}
	});

	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function canvasSetup(attr) {
	keys.length = 0;
	rightKeys(attr);
	render(keys, key_pattern, instrument);
}

let render = (attr, attr_two, attr_three) => { // attr_one - массив keys, отображающий гамму, attr_two - технический паттерн
																							 // attr_three - piano or guitar
	if (attr_three == 'piano') {
		let coord = 42;
		let y_coord = 3;


		for (let i = 0; i < attr.length; i++) {
			coord += 10;
			ctx.lineWidth = '0.4'

			if (attr_two[i] == true) {
				ctx.globalCompositeOperation = "destination-over";

				if (attr[i] == true && i !== 4) {
					ctx.fillStyle = 'lightgrey';
					ctx.strokeStyle = 'black';
					ctx.fillRect(coord, y_coord, 8, 50);
					ctx.strokeRect(coord, y_coord, 8, 50);
				} else if (attr[i] == false && i !== 4) {
					ctx.fillStyle = 'white';
					ctx.strokeStyle = 'black';
					ctx.fillRect(coord, y_coord, 8, 50);
					ctx.strokeRect(coord, y_coord, 8, 50);
				} else if (attr[i] == true && i == 4) {
					coord -= 1;
					ctx.fillStyle = 'lightgrey';
					ctx.strokeStyle = 'black';
					ctx.fillRect(coord, y_coord, 8, 50);
					ctx.strokeRect(coord, y_coord, 8, 50);
					coord -= 2;
				} else if (attr[i] == false && i == 4) {
					coord -= 1;
					ctx.fillStyle = 'white';
					ctx.strokeStyle = 'black';
					ctx.fillRect(coord, y_coord, 8, 50);
					ctx.strokeRect(coord, y_coord, 8, 50);
					coord -= 2;
				}

			} else if (attr_two[i] == false) {
				ctx.globalCompositeOperation = "source-over";

				if (attr[i] == true && i !== 4) {
					coord -= 6;
					ctx.fillStyle = 'darkred';
					ctx.strokeStyle = 'black';
					ctx.fillRect(coord, y_coord, 6, 35);
					ctx.strokeRect(coord, y_coord, 6, 35);
					coord -= 6;
				} else {
					coord -= 6;
					ctx.strokeStyle = 'black';
					ctx.fillStyle = 'black'
					ctx.strokeRect(coord, y_coord, 6, 35);
					ctx.fillRect(coord, y_coord, 6, 35);
					coord -= 6
				}
			}

		}
		;
	} else if (attr_three == 'guitar') {
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		canvasGuitarSetup();
		getNotesOnFretBoard();
		renderGuitarNotes(notesOnString);
	}
};

function canvasGuitarSetup() {
	ctx.globalCompositeOperation = "source-over";
	ctx.lineWidth = '0.4'
	let x_coord = 20
	let y_coord = 3
	let y_coord_string = 3.3;
	let x_fret = 20;
	let y_fret = 3;
	ctx.strokeStyle = 'black'
	ctx.fillStyle = '#a36f40';
	ctx.strokeRect(x_coord, y_coord, 120, 35)
	ctx.fillRect(x_coord, y_coord, 120, 35);

	for (let i = 2; i <= 36; i += 6) { // generate strings
		ctx.strokeStyle = 'lightgrey';
		ctx.moveTo(x_coord, y_coord_string + i);
		ctx.lineTo(140, y_coord_string + i);
		ctx.stroke();
	}

	for (let i = 8; i <= 119; i += 8) { // generate frets
		ctx.moveTo(x_fret + i, y_fret);
		ctx.lineTo(x_fret + i, 38);
		ctx.stroke();
	}

	// sets fret numbers
	let step = 8.5

	ctx.font = '4px Nunito, sans-serif';
	ctx.fillStyle = 'black'
	ctx.fillText('5', x_coord + (step * 4) + 1, 43);
	ctx.fillText('7', x_coord + (step * 6), 43);
	ctx.fillText('9', x_coord + (step * 8) - 1, 43);
	ctx.fillText('12', x_coord + (step * 11) - 4, 43);

}

function getNotesOnFretBoard() {
	isToRender.forEach((item, i) => { // clears the array for reuse
		return item.length = 0
	});

	notesOnString.forEach((item, i) => {
		return item.length = 0;
	});

	for (let i = 0; i < notesOnString.length; i++) { // decides which notes you have on every string
		let current = i
		guitarStrings[i].forEach((item, index) => {
			if (scale.includes(item)) {
				return notesOnString[i].push(item);
			}
		});
	}

	for (let i = 0; i < 6; i++) { // calculates the matrix of notes on fretboard
		guitarStrings[i].forEach((item, index) => {
			if (notesOnString[i].includes(item)) {
				return isToRender[i].push(true);
			} else {
				return isToRender[i].push(false);
			}
		});

	}

}

function renderGuitarNotes() {
	let x_coord = 8
	let y_coord = -0.5
	for (let i = 0; i < 6; i++) {
		x_coord = 8;
		y_coord += 6;

		for (let j = 0; j < 15; j++) {
			if (isToRender[i][j] == true && guitarStrings[i][j] != root) {
				ctx.beginPath();
				ctx.arc(x_coord + 8, y_coord, 2, 0, 2 * Math.PI);
				ctx.fillStyle = '#26CC26'
				ctx.fill()
				ctx.beginPath();
				ctx.font = '3px Nunito, sans-serif';
				ctx.fillStyle = 'black'
				ctx.fillText(guitarStrings[i][j], x_coord + 8 - 1, y_coord + 1);

				x_coord += 8;

			} else if (isToRender[i][j] == true && guitarStrings[i][j] == root) {
				ctx.beginPath();
				ctx.arc(x_coord + 8, y_coord, 2, 0, 2 * Math.PI);
				ctx.fillStyle = 'gold'
				ctx.fill()
				ctx.beginPath();
				ctx.font = '3px Nunito, sans-serif';
				ctx.fillStyle = 'black'
				ctx.fillText(guitarStrings[i][j], x_coord + 8 - 1, y_coord + 1);

				x_coord += 8;

			} else {
				x_coord += 8;
			}
		}
	}
}
