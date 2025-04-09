function getOrdinal(n) {
	const s = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return { value: n, label: n + (s[(v - 20) % 10] || s[v] || s[0]) };
}

const monthDayOptions = Array.from({ length: 31 }, (_, i) => getOrdinal(i + 1));

console.log(monthDayOptions);
