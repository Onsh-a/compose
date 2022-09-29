export default class Keyboard {
  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  pianoKeyboard = [true, false, true, false, true, true, false, true, false, true, false, true];
  xCoordinate = 15;
  yCoordinate = 15;

  rightKeys(activeNotes) {
    return this.notes.concat(this.notes).map((item) => {
      return {
        isActive: activeNotes.includes(item),
        note: item,
        isRoot: item === activeNotes[0],
      }
    });
  }

  printKeyboard(canvas, activeNotes) {
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 380;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    activeNotes = this.rightKeys(activeNotes);

    let x_coord = this.xCoordinate;
    let y_coord = this.yCoordinate;

    const keyboardExtended = this.pianoKeyboard.concat(this.pianoKeyboard);

    keyboardExtended.forEach((key, index) => {
      const active = activeNotes[index].isActive;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      if (key) {
        ctx.fillStyle = 'white';
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillRect(x_coord, y_coord, 30, 160);
        ctx.strokeRect(x_coord, y_coord, 30, 160);
      } else {
        ctx.fillStyle = 'black';
        ctx.globalCompositeOperation = "source-over";
        ctx.fillRect(x_coord, y_coord, 22, 120);
        ctx.strokeRect(x_coord, y_coord, 22, 120);
      }

      if (active) {
        const pointCoordX = x_coord + (key ? 30 : 22) / 2 - (key ? 8 : 6);
        const pointCoordY = key ? 145 : 115;
        const height = key ? 20 : 14
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = activeNotes[index].isRoot ? 'gold' : '#26CC26'
        ctx.fillRect(pointCoordX, pointCoordY, key ? 16 : 12, height);

        ctx.beginPath();
        ctx.font = '8px Nunito, sans-serif';
        ctx.fillStyle = 'black'
        const noteCoordX = activeNotes[index].note.length < 2 ? pointCoordX + 5 : pointCoordX;
        ctx.fillText(activeNotes[index].note, noteCoordX, pointCoordY + height / 2 + 4);
      }

      if (key === true) x_coord += 20;
      if (key === false && keyboardExtended[index + 1] !== false) x_coord += 10;
      if (index === 4 || index === 11 || index === 16) x_coord += 10;
    })
  }
}
