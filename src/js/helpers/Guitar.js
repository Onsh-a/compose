export default class Guitar {
  constructor(guitarCanvas, isSharp = true) {
    this.canvas = guitarCanvas;
    this.ctx = this.canvas.getContext('2d');
    this.isSharp = isSharp;
  }

  _guitarStrings = {
    sharp: [
      ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'], // first
      ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'],
      ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
      ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
      ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#']
    ],
    flat: [
      ['E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭'],
      ['B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B', 'C', 'D♭'],
      ['G', 'A♭', 'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A'],
      ['D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E'],
      ['A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'],
      ['E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭']
    ]
  }

  setIsSharp(isSharp) {
    this.isSharp = isSharp;
  }

  _getStrings() {
    return this._guitarStrings[this.isSharp ? 'sharp' : 'flat'];
  }

  notesOnString = [];
  isToRender = [];
  width = 800;
  height = 280;

  renderGuitar(scale, root) {
    this.scale = scale;
    this.root = root;

    this.canvasGuitarSetup();
    this.getNotesOnFretBoard();
    this.renderGuitarNotes(this.notesOnString);
  };

  canvasGuitarSetup () {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.scale(6, 6);
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.lineWidth = '0.4'
    const x_coord = 8
    const y_coord = 3
    const fretboardWidth = 120;
    const fretboardHeight = 35;
    const y_coord_string = 3.3;
    const x_fret = x_coord;
    const y_fret = y_coord;
    this.ctx.strokeStyle = 'black'
    this.ctx.fillStyle = '#a36f40';
    this.ctx.strokeRect(x_coord, y_coord, fretboardWidth, fretboardHeight)
    this.ctx.fillRect(x_coord, y_coord, fretboardWidth, fretboardHeight);

    for (let i = 2; i <= 36; i += 6) { // generate strings
      this.ctx.strokeStyle = 'lightgrey';
      this.ctx.moveTo(x_coord, y_coord_string + i);
      this.ctx.lineTo(x_coord + 120, y_coord_string + i);
      this.ctx.stroke();
    }

    for (let i = 8; i <= 119; i += 8) { // generate frets
      this.ctx.moveTo(x_fret + i, y_fret);
      this.ctx.lineTo(x_fret + i, y_fret + fretboardHeight);
      this.ctx.stroke();
    }

    // sets fret numbers
    const step = 8.5
    this.ctx.font = '4px Nunito, sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('5', x_coord + (step * 4) + 1, 43);
    this.ctx.fillText('7', x_coord + (step * 6), 43);
    this.ctx.fillText('9', x_coord + (step * 8) - 1, 43);
    this.ctx.fillText('12', x_coord + (step * 11) - 4, 43);
  }

  getNotesOnFretBoard() {
    for (let i = 0; i < 6; i++) {
      this.notesOnString[i] = this._getStrings()[i].filter((item) => this.scale.includes(item));
      this.isToRender[i] = this._getStrings()[i].map((item) => this.notesOnString[i].includes(item));
    }
  }

  renderGuitarNotes() {
    let y_coord = -0.5
    for (let i = 0; i < 6; i++) {
      let x_coord = -4;
      y_coord += 6;

      for (let j = 0; j < 15; j++) {
        if (this.isToRender[i][j] !== true) {
          x_coord += 8; // if note is absent
        } else {
          this.ctx.beginPath();
          this.ctx.arc(x_coord + 8, y_coord, 2, 0, 2 * Math.PI);
          this.ctx.fillStyle = this._getStrings()[i][j] !== this.root ? '#26CC26' : 'gold'
          this.ctx.fill()
          this.ctx.beginPath();
          this.ctx.font = '3px Nunito, sans-serif';
          this.ctx.fillStyle = 'black'
          this.ctx.fillText(this._getStrings()[i][j], x_coord + 8 - 1, y_coord + 1);
          x_coord += 8;
        }
      }
    }
  }
}
