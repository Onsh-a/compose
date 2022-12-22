export default class Keyboard {
  constructor(keyboardCanvas) {
    this.canvas = keyboardCanvas;
    this.ctx = this.canvas.getContext('2d');
  }

  _notes = {
    sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    flat: ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'],
  }
  pianoKeyboard = [true, false, true, false, true, true, false, true, false, true, false, true];
  xCoordinate = 15;
  yCoordinate = 15;

  preparedKeysData(activeNotes) {
    return this._getNotes().concat(this._getNotes()).map((item) => {
      return {
        isActive: activeNotes.includes(item),
        note: item,
        isRoot: item === activeNotes[0],
      }
    });
  }

  _getNotes() {
    return this._notes[this.isSharp ? 'sharp' : 'flat'];
  }

  _setIsSharp(isSharp) {
    this.isSharp = isSharp;
  }

  _defineIsSharp(scale) {
    const note = scale.find(note => note.length > 1);
    if (!note) {
      this._setIsSharp(true);
      return;
    }
    this._setIsSharp(note.split('')[1] === '#');
  }

  renderKeyboard(activeNotes) {
    this._defineIsSharp(activeNotes);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = 900;
    this.canvas.height = 380;
    this.ctx.scale(2, 2);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    activeNotes = this.preparedKeysData(activeNotes);

    let x_coord = this.xCoordinate;
    let y_coord = this.yCoordinate;

    const keyboardExtended = this.pianoKeyboard.concat(this.pianoKeyboard);

    keyboardExtended.forEach((key, index) => {
      const active = activeNotes[index].isActive;
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = 'black';
      if (key) {
        this.ctx.fillStyle = 'white';
        this.ctx.globalCompositeOperation = "destination-over";
        this.ctx.fillRect(x_coord, y_coord, 30, 160);
        this.ctx.strokeRect(x_coord, y_coord, 30, 160);
      } else {
        this.ctx.fillStyle = 'black';
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.fillRect(x_coord, y_coord, 22, 120);
        this.ctx.strokeRect(x_coord, y_coord, 22, 120);
      }

      if (active) {
        const pointCoordX = x_coord + (key ? 30 : 22) / 2 - (key ? 8 : 6);
        const pointCoordY = key ? 145 : 115;
        const height = key ? 20 : 14
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.fillStyle = activeNotes[index].isRoot ? 'gold' : '#26CC26'
        this.ctx.fillRect(pointCoordX, pointCoordY, key ? 16 : 12, height);

        this.ctx.beginPath();
        this.ctx.font = '8px Nunito, sans-serif';
        this.ctx.fillStyle = 'black'
        const noteCoordX = activeNotes[index].note.length < 2 ? pointCoordX + 5 : pointCoordX;
        this.ctx.fillText(activeNotes[index].note, noteCoordX, pointCoordY + height / 2 + 4);
      }

      if (key === true) x_coord += 20;
      if (key === false && keyboardExtended[index + 1] !== false) x_coord += 10;
      if (index === 4 || index === 11 || index === 16) x_coord += 10;
    })
  }
}
