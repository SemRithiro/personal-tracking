export const frequencyOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'].map((e) => ({ value: e.toLowerCase(), label: e }));

export const weekDayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((e) => ({ value: e.slice(0, 2).toUpperCase(), label: e }));

export const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((e, i) => ({ value: i + 1, label: e }));

function getOrdinal(n) {
	const s = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return { value: n, label: n + (s[(v - 20) % 10] || s[v] || s[0]) };
}

export const monthDayOptions = Array.from({ length: 31 }, (_, i) => getOrdinal(i + 1));

export const weekNumberOptions = [
	{ value: 1, label: 'First' },
	{ value: 2, label: 'Second' },
	{ value: 3, label: 'Third' },
	{ value: 4, label: 'Forth' },
	{ value: 5, label: 'Fifth' },
	{ value: -2, label: 'Next to last' },
	{ value: -1, label: 'Last' },
];
