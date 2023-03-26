export const round = (number, decimalPlaces) => {
	const factorOfTen = Math.pow(10, decimalPlaces);
	return Math.round(number * factorOfTen) / factorOfTen;
};

export function numberWithCommas(x) {
	if (typeof x === 'number') {return x;} 
	else if (x.indexOf(',') > -1) { return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") };
}