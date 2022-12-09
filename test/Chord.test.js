const testMap = require('../dist_test/testMap.js').default;
const expect = require('chai').expect

describe("Chord", function() {

  it("возводит в степень n", function() {
    const ch = new testMap.chord();
    expect(ch.calcChord('Cm').to.equal(['C', 'D#', 'G']));
  });
});
