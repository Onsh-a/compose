export default class Scale {
  constructor(root, scaleType, isSharp = true) {
    this.root = root;
    this.scaleType = scaleType;
    this.isSharp = isSharp;
    this.scalePattern = this.scalePatterns[scaleType];
  }

  _notes = {
    sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    flat: ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']
  }

  scalePatterns = {
    major: [0, 2, 4, 5, 7, 9, 11],
    natural_minor: [0, 2, 3, 5, 7, 8, 10],
    harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
    melodic_minor: [0, 2, 3, 5, 7, 9, 11],
    pentatonic_major: [0, 2, 4, 7, 9],
    pentatonic_minor: [0, 3, 5, 7, 10],
  };

  setRoot(root) {
    this.root = root;
  }

  setScaleType(scaleType) {
    this.scaleType = scaleType;
    this.scalePattern = this.scalePatterns[scaleType];
  }

  setIsSharp(isSharp) {
    this.isSharp = isSharp;
  }

  getNotes() {
    return this.isSharp ? this._notes.sharp : this._notes.flat;
  }

  getScale() {
    const notes = this.getNotes();
    const startPoint = notes.indexOf(this.root);
    const sortedArr = notes.slice(startPoint).concat(notes.slice(0, startPoint));
    return this.scalePattern.map(item => sortedArr[item]);
  }
}
