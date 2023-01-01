export default function romanize(arabicNumber: number) {
	if (!+arabicNumber) return NaN;
	let digits = String(+arabicNumber).split('');
	let key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
		'','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
		'','I','II','III','IV','V','VI','VII','VIII','IX'];
	let roman = '', i = 3;
	while (i--) { // @ts-ignore
		roman = (key[+digits.pop() + (i * 10)] || '') + roman;
	}
	return Array(+digits.join('') + 1).join('M') + roman;
};
