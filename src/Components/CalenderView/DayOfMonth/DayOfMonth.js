function DayOfMonth({
	day,
	placeHolder,
	today,
	active,
	cbFunc,
	numOfTodos,
	dayValues,
}) {
	const generateNotches = () => {
		let innerText;
		if (numOfTodos[0] > 0) {
			if (numOfTodos[1] > 0) {
				innerText = `${numOfTodos[1]} todo${numOfTodos[1] > 1 ? 's' : ''} due!`;
			} else {
				innerText = 'All todos done!';
			}
		}
		return innerText;
	};

	return (
		<>
			{placeHolder ? (
				<div className='placeholder grid-child'></div>
			) : (
				<button
					id={day + '|day of this month'}
					className={`
						day-div
						grid-child
						${active ? 'active-day' : ''}
						${numOfTodos[0] > 0 ? 'has-todos' : ''}
						${numOfTodos[0] > 0 && numOfTodos[1] === 0 ? 'all-todos-done' : ''}
						${today ? 'today' : ''}
						${isHoliday(dayValues) ? 'is-holiday' : ''}
						${isFlagDay(dayValues) ? 'is-flag-day' : ''}
					`}
					onClick={cbFunc}
				>
					{numOfTodos ? (
						<div className='notch-container'>{generateNotches()}</div>
					) : (
						<> </>
					)}
					<div className='date-num'>{day}</div>
				</button>
			)}
		</>
	);
}

export default DayOfMonth;

function isHoliday(dayValues) {
	if (dayValues) {
		return dayValues['röd dag'] === 'Ja' || dayValues['arbetsfri dag'] === 'Ja';
	} else {
		return false;
	}
}

function isFlagDay(dayValues) {
	if (dayValues) {
		return dayValues['flaggdag'] !== '';
	} else {
		return false;
	}
}
