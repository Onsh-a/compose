const diatonicPatterns = {
  major: ['', 'm', 'm', '', '', 'm', 'dim'],
  natural_minor: ['m', 'dim', '', 'm', 'm', '', ''],
  harmonic_minor: ['m', 'dim', 'aug', 'm', '', '', 'dim'],
  melodic_minor: ['m', 'm', 'aug', '', '', 'dim', 'dim'],
}

const calcDiatonic = (scale, scaleName) => {
  const diatonicPattern = diatonicPatterns[scaleName];
  return diatonicPattern.map((item, index) => `${scale[index]}${item}`);
}

export default calcDiatonic

