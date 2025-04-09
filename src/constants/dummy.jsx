export const eventGroups = [
	{ id: 1, name: 'Private', checked: true, color: 'red', colorCode: '#CB3A32' },
	{ id: 2, name: 'Holiday', checked: true, color: 'yellow', colorCode: '#F9E065' },
];

export const events = [
	{
		id: 1,
		eventGroupId: 1,
		title: 'Progress Meeting',
		color: '#CB3A32',
		duration: '00:30:00',
		exdate: ['2025-04-21'],
		rrule: {
			freq: 'daily',
			interval: 3,
			// byweekday: ['mo', 'fr'], // if it's every Monday, adjust as needed
			dtstart: '2025-04-07T11:30:00', // adjust start date
			count: 2,
		},
	},
];
