export default class Scale {
  constructor(root: string, scaleType: string, isSharp:boolean = true) {
    this.root = root;
    this.scaleType = scaleType;
    this.isSharp = isSharp;
    this._scalePattern = this._scalePatterns[scaleType];
  }

  private root: string;
  private scaleType: string;
  private isSharp: boolean;
  private _scalePattern: number[];

  _notes = {
    sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    flat: ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']
  }

  _scalePatterns: { [index: string]: number[] } = {
    major: [0, 2, 4, 5, 7, 9, 11],
    natural_minor: [0, 2, 3, 5, 7, 8, 10],
    harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
    melodic_minor: [0, 2, 3, 5, 7, 9, 11],
    pentatonic_major: [0, 2, 4, 7, 9],
    pentatonic_minor: [0, 3, 5, 7, 10],
  };

  setRoot(root: string): void {
    this.root = root;
  }

  setScaleType(scaleType: string): void {
    this.scaleType = scaleType;
    this._scalePattern = this._scalePatterns[scaleType];
  }

  setIsSharp(isSharp: boolean): void {
    if (this.root.length > 1) {
      const index = this.getNotes().findIndex(note => this.root === note);
      this.isSharp = isSharp;
      this.setRoot(this.getNotes()[index]);
      return;
    }
    this.isSharp = isSharp;
  }

  getNotes() {
    return this.isSharp ? this._notes.sharp : this._notes.flat;
  }

  getScale() {
    const notes = this.getNotes();
    const startPoint = notes.indexOf(this.root);
    const sortedArr = notes.slice(startPoint).concat(notes.slice(0, startPoint));
    return this._scalePattern.map(item => sortedArr[item]);
  }
}
