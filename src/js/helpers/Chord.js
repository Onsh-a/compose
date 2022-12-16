export default class Chord {
  patterns = {
    maj: [0, 4, 7],
    m: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
  };
  isSharp = true;
  diatonicPatterns = {
    major: ['', 'm', 'm', '', '', 'm', 'dim'],
    natural_minor: ['m', 'dim', '', 'm', 'm', '', ''],
    harmonic_minor: ['m', 'dim', 'aug', 'm', '', '', 'dim'],
    melodic_minor: ['m', 'm', 'aug', '', '', 'dim', 'dim'],
  }
  _notes = {
    sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    flat: ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♭', 'G', 'A♭', 'A', 'B♭', 'B'],
  }
  _getNotes() {
    return this._notes[this.isSharp ? 'sharp' : 'flat'];
  }
  setIsSharp(isSharp) {
    this.isSharp = isSharp;
  }

  calcChord(chord) {
    const chordType = this.getChordType(chord);
    const startPoint = this._getNotes().indexOf(this.getNote(chord));
    const sortedArr = this._getNotes().slice(startPoint).concat(this._getNotes().slice(0, startPoint));
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
    if (diatonicPattern) {
      return diatonicPattern.map((item, index) => `${scale[index]}${item}`);
    }
    return [];
  }
}
