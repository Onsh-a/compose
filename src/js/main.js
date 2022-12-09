import romanize from './helpers/romanizeNumbers';
import Chord from './helpers/Chord';
import Keyboard from './helpers/Keyboard';
import Guitar from './helpers/Guitar';
import Scale from './helpers/Scale';
import initSelect from './helpers/customSelect';

document.addEventListener('DOMContentLoaded', () => {
  const DEFAULT_ROOT = 'C';
  const DEFAULT_SCALE_TYPE  = 'major';
  const scaleCanvas = document.querySelector('.canvas');
  const chordCanvas = document.querySelector('.chord__applicature');

  initSelect();
  const chordKyboard = new Keyboard(chordCanvas);
  const keyboard = new Keyboard(scaleCanvas);
  const guitar = new Guitar(scaleCanvas);
  const chord = new Chord();
  const scaleClass = new Scale(DEFAULT_ROOT, DEFAULT_SCALE_TYPE);
  window.scaleClass = scaleClass;

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
    chordKyboard.renderKeyboard(chord.calcChord(settings.root));
    printScaleTable(scale);
    printDiatonicChords(chord.calcDiatonic(scale, settings.scale));
    setChordApplicatures();
    render(scale, settings.instrument);
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
        keyboard.renderKeyboard(chordNotes);
      })
    })
  }

	// ======================= canvas settings ========================

	const render = (activeKeys, instrument) => {
		if (instrument === 'piano') {
      keyboard.renderKeyboard(scale);
		} else if (instrument === 'guitar') {
      guitar.renderGuitar(scale, settings.root);
		}
	};

  main();
});

