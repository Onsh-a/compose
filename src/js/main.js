import romanize from './helpers/romanizeNumbers';
import Chord from './helpers/Chord';
import Keyboard from './helpers/Keyboard';
import Guitar from './helpers/Guitar';
import initSelect from './helpers/customSelect';

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.querySelector('.canvas');

  initSelect();
  const keyboard = new Keyboard();
  const chord = new Chord();
  const guitar = new Guitar(canvas);

	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

	const scalePatterns = {
		major: [0, 2, 4, 5, 7, 9, 11],
		natural_minor: [0, 2, 3, 5, 7, 8, 10],
    harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
    melodic_minor: [0, 2, 3, 5, 7, 9, 11],
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
    keyboard.printKeyboard(chordCanvas, chord.calcChord(settings.root));
    printScaleTable(scale);
    printDiatonicChords(chord.calcDiatonic(scale, settings.scale));
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

  const printDiatonicChords = (chords) => {
    let mainSteps = '';
    let commonSteps = '';
    chords.forEach((item, index) => {
      const sign = romanize(index + 1);
      if ([0, 3, 4].includes(index)) {
        mainSteps += `<span>${sign}: </span><span class="chord">${item}</span><br>`
      } else {
        commonSteps += `<span>${sign}: </span><span class="chord">${item}</span><br>`
      }
    })

    diatonicChordField.innerHTML = mainSteps;
    basicChordField.innerHTML = commonSteps;
  }

	const setChordApplicatures = () => {
	  const chords = document.querySelectorAll('.progression .chord');
    const title = document.querySelector('.chord__title');
    chords.forEach((item) => {
      item.addEventListener('click', (e) => {
        const chordNotes = chord.calcChord(e.target.innerText);
        title.innerText = `Chord ${e.target.innerText}`;
        keyboard.printKeyboard(chordCanvas, chordNotes);
      })
    })
  }

	// ======================= canvas settings ========================

	const ctx = canvas.getContext('2d');

	const rightKeys = (scale) => {
		return notes.map((item) => scale.includes(item));
	}

	const canvasSetup = (scale) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		render(rightKeys(scale), settings.instrument);
	}

	const render = (activeKeys, instrument) => {
		if (instrument === 'piano') {
      keyboard.printKeyboard(canvas, scale);
		} else if (instrument === 'guitar') {
      guitar.initGuitarCanvas(scale, settings.root);
		}
	};

  main();
});

