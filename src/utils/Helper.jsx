import moment from 'moment';
import { THRESHOLD_TIME } from '../constants/app';

Object.byString = function (o, s) {
	s = s.replace(/\[(\w+)\]/g, '.$1');
	s = s.replace(/^\./, '');
	var a = s.split('.');
	for (var i = 0, n = a.length; i < n; ++i) {
		var k = a[i];
		if (k in o) {
			o = o[k];
		} else {
			return;
		}
	}
	return o;
};

export const generateString = (length) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
};

export const deepValue = (obj, keys) => {
	return keys.reduce((acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : undefined), obj);
};

export const isNA = (txt, textReturn = '-') => {
	if (isEmptyOrWhiteSpace(txt)) {
		return txt;
	} else return textReturn;
};

export const isNumber = (number, fixed = 0) => {
	number = parseFloat(number).toFixed(fixed);
	if (isNaN(number)) return 0;
	else return number;
};

export const isEmptyOrWhiteSpace = (...list) => {
	let index = 0;
	list.forEach((element) => {
		switch (typeof element) {
			case 'number':
			case 'string':
				if (element.toString().trim() !== '') index = index + 1;
				break;
			case 'object':
				if (element) if (isEmptyOrWhiteSpace(element.toString())) index = index + 1;
				break;
			default:
				return null;
		}
	});
	return index === list.length;
};

export const formatDate = (date) => {
	return moment(date).format('YYYY-MM-DD');
};

export const getDate = (shift = 0, date = new Date()) => {
	let newDate = new Date(date);
	if (shift < 0) {
		newDate.setHours(THRESHOLD_TIME, 0, 0, 0);
	} else if (shift > 0) {
		newDate.setDate(newDate.getDate() + parseInt(shift));
		newDate.setHours(THRESHOLD_TIME, 0, 0, 0);
	}

	return moment(newDate).format('YYYY-MM-DD hh:mm').toString();
};

export const startOf = (type, date = new Date()) => {
	let result;
	switch (type) {
		case 'day':
			result = new Date();
			break;
		case 'week':
			let day = date.getDay();
			result = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? -6 : 1) - day);
			break;
		case 'month':
			result = new Date(date.getFullYear(), date.getMonth(), 1);
			break;
		case 'year':
			result = new Date(date.getFullYear(), 0, 1);
			break;
		default:
			result = date;
	}
	return moment(result).format('YYYY-MM-DD');
};

export const endOf = (type, date = new Date()) => {
	let result;
	switch (type) {
		case 'day':
			result = new Date();
			break;
		case 'week':
			let day = date.getDay();
			result = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? 0 : 7) - day);
			break;
		case 'month':
			result = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			break;
		case 'year':
			result = new Date(date.getFullYear(), 11, 31);
			break;
		default:
			result = date;
	}
	return moment(result).format('YYYY-MM-DD');
};
