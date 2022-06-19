import romanize from './helpers/romanizeNumbers.js';
import calcChord from './helpers/makeChords';
import printKeyboard from './helpers/printKeyboard';
import initSelect from './helpers/customSelect';

document.addEventListener('DOMContentLoaded', function() {
  initSelect();

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

	let scale = [];

	const rootNotes = document.querySelector('.select-root');
	const diatonicChordField = document.querySelector('.progression__chords-diatonic');
	const basicChordField = document.querySelector('.progression__chords-basic');
  const chordCanvas = document.querySelector('.chord__applicature');

  document.addEventListener('changeSettings', (e) => {
    settings[e.detail.eventType] = e.detail.value;
    main();
  });

  rootNotes.addEventListener('click', (e) => {
    const current = e.target;
    if (current.classList.contains('select-root__item')) {
      toggleActive(current);
      const eventDetail = {
        eventType: 'root',
        value: current.innerText,
      }
      document.dispatchEvent(new CustomEvent('changeSettings', { detail: eventDetail }));
    }
  })

	const main = () => {
    scale = buildScale(settings.root, notes, settings.getPattern());
    printKeyboard(chordCanvas, calcChord(settings.root));
    printScaleTable(scale);
    decideOnDiatonic(scale, settings.scale);
    setChordApplicatures();
    canvasSetup(scale);
  };

	const toggleActive = (elem) => {
    settings.root = elem.innerText;
    const previous = document.querySelector('.select-root').querySelector('.active');
    if (previous) previous.classList.remove('active')
		elem.classList.add('active');
	}

	const buildScale = (startPoint, notes, scalePattern) => {
		startPoint = notes.indexOf(startPoint);
		const sortedArr = notes.slice(startPoint).concat(notes.slice(0, startPoint));
		return scalePattern.map(item => sortedArr[item]);
	}

	const printScaleTable = (scale) => {
    const tableCells = document.querySelectorAll('.scale__notes td:not(:first-child)');
    tableCells.forEach((item, index) => item.innerText = scale[index]);
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
			basicChordsText = basicChords.map((item, index) => `
        <span>${item.step}:</span>
        <span class="chord">${item.chord}${index === 3 ? 'dim' : 'm'}</span><br>`)
			diatonicChordsText = diatonicChords.map((item, index) => `
        <span>${item.step}:</span> 
        <span class="chord">${item.chord}</span><br>`);
		} else {
			basicChordsText = basicChords.map((item, index) => `
        <span>${item.step}:</span> 
        <span class="chord">${item.chord}${index === 0 ? 'dim' : 'm'}</span><br>`)
			diatonicChordsText = diatonicChords.map((item, index) => `
        <span>${item.step}:</span> 
        <span class="chord">${item.chord}${index === 0 ? 'm' : ''}</span><br>`)
		}

		diatonicChordField.innerHTML = diatonicChordsText.join('');
		basicChordField.innerHTML = basicChordsText.join('');
	}

	const setChordApplicatures = () => {
	  const chords = document.querySelectorAll('.progression .chord');
    const chordField = document.querySelector('.chord__notes');
    chords.forEach((item) => {
      item.addEventListener('click', (e) => {
        const chordNotes = calcChord(e.target.innerText);
        chordField.innerHTML = `Notes: ${e.target.innerText} = ${chordNotes}`;
        printKeyboard(chordCanvas, chordNotes);
      })
    })
  }

	// ======================= canvas settings ========================

  const canvas = document.querySelector('.canvas');
	const ctx = canvas.getContext('2d');
  // ctx.scale(6, 6);
  // canvas.width = 800;
  // canvas.height = 200;

	const guitarStrings = [
		['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'], // first
		['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'],
		['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
		['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
		['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
		['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#']
	]

	const notesOnString = []; // array with current notes on the fretboard (active in scale)
	const isToRender = []; // array with pattern to render these notes

	const rightKeys = (scale) => {
		return notes.map((item) => scale.includes(item));
	}

	const canvasSetup = (scale) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		render(rightKeys(scale), settings.instrument);
	}

	const render = (activeKeys, instrument) => {
		if (instrument === 'piano') {
      printKeyboard(canvas, scale);
		} else if (instrument === 'guitar') {
      const canvas = document.querySelector('.canvas');
      canvas.width = 800;
      canvas.height = 280;
      ctx.scale(6, 6);
			canvasGuitarSetup();
			getNotesOnFretBoard();
			renderGuitarNotes(notesOnString);
		}
	};

	const canvasGuitarSetup = () => {
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
			notesOnString[i] = guitarStrings[i].filter((item) => scale.includes(item));
			isToRender[i] = guitarStrings[i].map((item) => notesOnString[i].includes(item));
		}
	}

	const renderGuitarNotes = () => {
		let y_coord = -0.5
		for (let i = 0; i < 6; i++) {
			let x_coord = -4;
			y_coord += 6;

			for (let j = 0; j < 15; j++) {
				if (isToRender[i][j] !== true) {
					x_coord += 8; // if note is absent
				} else {
					ctx.beginPath();
					ctx.arc(x_coord + 8, y_coord, 2, 0, 2 * Math.PI);
					ctx.fillStyle = guitarStrings[i][j] !== settings.root ? '#26CC26' : 'gold'
					ctx.fill()
					ctx.beginPath();
					ctx.font = '3px Nunito, sans-serif';
					ctx.fillStyle = 'black'
					ctx.fillText(guitarStrings[i][j], x_coord + 8 - 1, y_coord + 1);
					x_coord += 8;
				}
			}
		}
	}

  main();

	// chords canvas
  // TODO create chord shape drawing canvas
});

