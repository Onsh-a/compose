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

	// default settings
	const settings = {
		root: 'C',
		scale: 'major',
		instrument: 'guitar',
	}

	let scale = [];

	const rootNotes = document.querySelector('.select-root');
	const diatonicChordField = document.querySelector('.progression__chords-diatonic');
	const basicChordField = document.querySelector('.progression__chords-basic');

  rootNotes.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('select-root__item')) {
      scaleClass.setRoot(target.innerText);
    }

    if (target.classList.contains('select-root__alter')) {
      scaleClass.setIsSharp(target.innerText.toLowerCase() === 'sharp');
      rootNotes.querySelectorAll('.select-root__item').forEach((item, index) => {
        item.innerText = scaleClass.getNotes()[index];
        item.dataset.root = scaleClass.getNotes()[index].toLowerCase();
      })
    }

    toggleActive();
    main();
  })

  document.addEventListener('changeSettings', (e) => {
    scaleClass.setScaleType(e.detail.value);
    main();
  });


  const main = () => {
    scale = scaleClass.getScale();
    chordKyboard.renderKeyboard(chord.calcChord(scaleClass.root));
    printScaleTable(scale);
    printDiatonicChords(chord.calcDiatonic(scale, scaleClass.scaleType));
    setChordApplicatures();
    render(scale, settings.instrument);
  };

	const toggleActive = () => {
    rootNotes.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
    rootNotes.querySelector(`[data-root='${scaleClass.root.toLocaleLowerCase()}']`).classList.add('active');
    rootNotes.querySelector(`[data-is-${scaleClass.isSharp ? 'sharp' : 'flat'}]`).classList.add('active');
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
        chordKyboard.renderKeyboard(chordNotes);
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

