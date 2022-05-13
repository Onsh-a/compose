import romanize from './helpers/romanizeNumbers.js';

document.addEventListener("DOMContentLoaded", function() {

	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

	// тон тон полутон тон тон тон - мажор
	// тон полутон тон тон полутон тон  - минор
	const scalePatterns = {
		major: [0, 2, 4, 5, 7, 9, 11],
		minor: [0, 2, 3, 5, 7, 8, 10],
	}

	// diatonic patterns;
	const diatonicPatterns = {
		major: [0, 3, 4],
		minor: [0, 2, 5, 6],
	}

	// default settings
	const settings = {
		root: 'C',
		scale: 'major',
		getPattern: function() {
			return scalePatterns[this.scale];
		},
		instrument: 'guitar',
	}

	let root = 'C';
	let scale = [];

	const controls = document.querySelectorAll('.select_root_item_name, .select_scale_item_name, .select_instrument_item_name')
	const scaleField = document.querySelector('.result_output');
	const diatonicChordField = document.querySelector('.progression_chords_diatonic_item');
	const basicChordField = document.querySelector('.progression_chords_basic_item');


	controls.forEach((item, i) => { // main function from rootnote
		item.addEventListener('click', (e) => {
			toggleActive(item);
			scale = buildScale(settings.root, notes, settings.getPattern());
			scaleField.innerHTML = scale;
			decideOnDiatonic(scale, settings.scale);
			canvasSetup(scale);
		})
	});

	setTimeout(() => {
		document.querySelector('.select_root_item_name.active').dispatchEvent(new Event("click"));
	}, 1000)

	function toggleActive(elem) {
		const setting = elem.dataset.type;
		settings[setting] = setting === 'root' ? elem.innerText : elem.innerText.toLowerCase();
		const wrapper = elem.closest('.select-wrapper');
		const previous = wrapper.querySelector('.active');
		previous.classList.remove('active')
		elem.classList.add('active');
	}

	const buildScale = (startPoint, notes, scalePattern) => {
		startPoint = notes.indexOf(startPoint);
		const sortedArr = notes.slice(startPoint).concat(notes.slice(0, startPoint));
		return scalePattern.map(item => sortedArr[item]);
	}

	const decideOnDiatonic = (scale, diatonicPattern) => {
		const pattern = diatonicPatterns[diatonicPattern];
		const diatonicChords = [];
		const basicChords = [];
		let basicChordsText;
		let diatonicChordsText;

		scale.forEach((item, index) => {
			if (pattern.includes(index)) return diatonicChords.push({ chord: item, step: romanize(index + 1) })
			basicChords.push({ chord: item, step: romanize(index + 1) });
		});

		if (diatonicPattern === 'major') {
			basicChordsText = basicChords.map((item, index) => `${item.step}: ${item.chord}${index === 3 ? 'dim' : 'm'}<br>`)
			diatonicChordsText = diatonicChords.map((item, index) => `${item.step}: ${item.chord} <br>`);
		} else {
			basicChordsText = basicChords.map((item, index) => `${item.step}: ${item.chord}${index === 0 ? 'dim' : 'm'}<br>`)
			diatonicChordsText = diatonicChords.map((item, index) => `${item.step}: ${item.chord}${index === 0 ? 'm' : ''}<br>`)
		}

		diatonicChordField.innerHTML = diatonicChordsText.join('');
		basicChordField.innerHTML = basicChordsText.join('');
	}

	// ======================= canvas settings ========================

	const canvas = document.querySelector('.canvas');
	const ctx = canvas.getContext('2d');
	let pianoKeyboard = [true, false, true, false, true, true, false, true, false, true, false, true] // true - нижняя, false - верхняя

	let guitarStrings = [
		['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'], // first
		['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'],
		['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
		['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
		['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
		['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#']
	]

	let notesOnString = []; // array with current notes on the fretboard (active in scale)
	let isToRender = []; // array with pattern to render these notes

	ctx.scale(6, 6)

	const rightKeys = (scale) => {
		return notes.map((item) => scale.includes(item));
	}

	const canvasSetup = (scale) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		render(rightKeys(scale), pianoKeyboard, settings.instrument);
	}

	const render = (activeKeys, keysPattern, instrument) => {
		if (instrument === 'piano') {
			let coord = 42;
			let y_coord = 3;

			for (let i = 0; i < activeKeys.length; i++) {
				coord += 10;
				ctx.lineWidth = '0.4'

				if (keysPattern[i] == true) {
					ctx.globalCompositeOperation = "destination-over";

					if (activeKeys[i] == true && i !== 4) {
						ctx.fillStyle = 'lightgrey';
						ctx.strokeStyle = 'black';
						ctx.fillRect(coord, y_coord, 8, 50);
						ctx.strokeRect(coord, y_coord, 8, 50);
					} else if (activeKeys[i] == false && i !== 4) {
						ctx.fillStyle = 'white';
						ctx.strokeStyle = 'black';
						ctx.fillRect(coord, y_coord, 8, 50);
						ctx.strokeRect(coord, y_coord, 8, 50);
					} else if (activeKeys[i] == true && i == 4) {
						coord -= 1;
						ctx.fillStyle = 'lightgrey';
						ctx.strokeStyle = 'black';
						ctx.fillRect(coord, y_coord, 8, 50);
						ctx.strokeRect(coord, y_coord, 8, 50);
						coord -= 2;
					} else if (activeKeys[i] == false && i == 4) {
						coord -= 1;
						ctx.fillStyle = 'white';
						ctx.strokeStyle = 'black';
						ctx.fillRect(coord, y_coord, 8, 50);
						ctx.strokeRect(coord, y_coord, 8, 50);
						coord -= 2;
					}

				} else {
					ctx.globalCompositeOperation = "source-over";

					if (activeKeys[i] == true && i !== 4) {
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

		} else if (instrument === 'guitar') {
			canvasGuitarSetup();
			getNotesOnFretBoard();
			renderGuitarNotes(notesOnString);
		}
	};

	function canvasGuitarSetup() {
		ctx.globalCompositeOperation = "source-over";
		ctx.lineWidth = '0.4'
		const x_coord = 8
		const y_coord = 3
		const fretboardWidth = 120;
		const fretboardHeight = 35;
		const y_coord_string = 3.3;
		const x_fret = x_coord;
		const y_fret = y_coord;
		ctx.strokeStyle = 'black'
		ctx.fillStyle = '#a36f40';
		ctx.strokeRect(x_coord, y_coord, fretboardWidth, fretboardHeight)
		ctx.fillRect(x_coord, y_coord, fretboardWidth, fretboardHeight);

		for (let i = 2; i <= 36; i += 6) { // generate strings
			ctx.strokeStyle = 'lightgrey';
			ctx.moveTo(x_coord, y_coord_string + i);
			ctx.lineTo(x_coord + 120, y_coord_string + i);
			ctx.stroke();
		}

		for (let i = 8; i <= 119; i += 8) { // generate frets
			ctx.moveTo(x_fret + i, y_fret);
			ctx.lineTo(x_fret + i, y_fret + fretboardHeight);
			ctx.stroke();
		}

		// sets fret numbers
		const step = 8.5
		ctx.font = '4px Nunito, sans-serif';
		ctx.fillStyle = 'black'
		ctx.fillText('5', x_coord + (step * 4) + 1, 43);
		ctx.fillText('7', x_coord + (step * 6), 43);
		ctx.fillText('9', x_coord + (step * 8) - 1, 43);
		ctx.fillText('12', x_coord + (step * 11) - 4, 43);
	}

	const getNotesOnFretBoard = () => {
		for (let i = 0; i < 6; i++) {
			notesOnString[i] = guitarStrings[i].map((item) => {
				if (scale.includes(item)) return item
			});

			isToRender[i] = guitarStrings[i].map((item) => notesOnString[i].includes(item));
		}
	}

	function renderGuitarNotes() {
		let x_coord = 8
		let y_coord = -0.5
		for (let i = 0; i < 6; i++) {
			x_coord = -4;
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
});
