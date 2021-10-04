import moment from 'moment';
function WeekDays() {
	const renderDivs = () => {
		const divs = [];

		for (let i = 0; i < 7; i++) {
			const weekDay = moment();
			weekDay.set('day', i);
			divs.push(
				<div className='week-day-label' key={weekDay.format('dddd')}>
					{weekDay.format('dddd')}
				</div>
			);
		}
		return divs;
	};
	return <div className='grid-container week-days'>{renderDivs()}</div>;
}

export default WeekDays;
