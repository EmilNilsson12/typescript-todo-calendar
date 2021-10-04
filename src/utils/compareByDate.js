import moment from 'moment';
export default function compareByDates(a, b) {
	const aDate = moment(a.deadline);
	const bDate = moment(b.deadline);

	console.log('aDate: ', aDate);
	console.log('bDate: ', bDate);
	console.log('bDate: ', bDate);

	let returnValue;
	aDate.isBefore(bDate)
		? (returnValue = -1)
		: bDate.isBefore(aDate)
		? (returnValue = 1)
		: (returnValue = 0);
	console.log('returnValue: ', returnValue);

	return returnValue;
}
