export default class Chord {
  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  patterns = {
    maj: [0, 4, 7],
    m: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
  };
  diatonicPatterns = {
    major: ['', 'm', 'm', '', '', 'm', 'dim'],
    natural_minor: ['m', 'dim', '', 'm', 'm', '', ''],
    harmonic_minor: ['m', 'dim', 'aug', 'm', '', '', 'dim'],
    melodic_minor: ['m', 'm', 'aug', '', '', 'dim', 'dim'],
  }

  calcChord(chord) {
    console.log(chord);
    const chordType = this.getChordType(chord);
    const startPoint = this.notes.indexOf(this.getNote(chord));
    const sortedArr = this.notes.slice(startPoint).concat(this.notes.slice(0, startPoint));
    console.log(this.patterns[chordType].map(item => sortedArr[item]));
    return this.patterns[chordType].map(item => sortedArr[item]);
  };

  getChordType(chord) {
    let chordType = chord.split('');
    chordType = chordType.filter(item => /[a-zA-Z]+/.test(item)); // trim '#'
    chordType.shift();
    return chordType.join('') || 'maj';
  }

  getNote(chord) {
    return chord.split('').includes('#') ? `${chord[0]}#` : `${chord[0]}`;
  }

  calcDiatonic(scale, scaleName) {
    const diatonicPattern = this.diatonicPatterns[scaleName];
    return diatonicPattern.map((item, index) => `${scale[index]}${item}`);
  }
}
