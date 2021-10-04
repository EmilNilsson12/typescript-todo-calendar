import { useState, useEffect } from 'react';
import './CalenderView.css';

import moment from 'moment';

import DayOfMonth from './DayOfMonth/DayOfMonth';
import WeekDays from './WeekDays/WeekDays';

function CalenderView({ todos, callBack, momentObj }) {
	// Today should only change when the user manually refreshes the page
	const [today, setToday] = useState(moment());
	const [currentTime, setCurrentTime] = useState(
		today.toString().split(' ')[4]
	);

	const [currentYear, setCurrentYear] = useState(
		momentObj.clone().format('YYYY')
	);

	const [loadingState, setLoadingState] = useState(true);

	useEffect(() => {
		async function fetchData() {
			// Only update state if the calendar shows a new year
			if (currentYear !== momentObj.clone().format('YYYY')) {
				setCurrentYear(momentObj.clone().format('YYYY'));
			}

			// Make sure to only fetch from the API once a year
			if (!localStorage.getItem(`year-${currentYear}`)) {
				// Add the current year to LS to prevent multiple fetches for the same year
				localStorage.setItem(`year-${currentYear}`, currentYear);

				await fetch(`https://sholiday.faboul.se/dagar/v2.1/${currentYear}`)
					.then((res) => {
						return res.json();
					})
					.then(async (data) => {
						// Add the fetched holidays to LS
						await localStorage.setItem(
							`year-${currentYear}-holidays`,
							JSON.stringify(data.dagar)
						);
						setLoadingState(false);
					});
			} else {
				setLoadingState(false);
			}
		}
		fetchData();
	}, [currentYear, momentObj]);

	useEffect(() => {
		setCurrentTime(momentObj.toString().split(' ')[4]);
	}, [momentObj]);

	const prevMonth = () => {
		const dateComponent = momentObj
			.clone()
			.subtract(1, 'M')
			.toISOString()
			.split('T')[0];

		const newMomentObj = moment(dateComponent + 'T' + currentTime);
		callBack(newMomentObj);
	};

	const nextMonth = () => {
		const dateComponent = momentObj
			.clone()
			.add(1, 'M')
			.toISOString()
			.split('T')[0];

		const newMomentObj = moment(dateComponent + 'T' + currentTime);
		callBack(newMomentObj);
	};

	const dateClicked = ({ target }) => {
		let clickedDate;
		if (target.textContent === '|') {
			clickedDate = parseInt(target.parentNode.parentNode.id.split('|')[0]);
		} else if (target.id === '') {
			clickedDate = parseInt(target.parentNode.id.split('|')[0]);
		} else {
			clickedDate = parseInt(target.id.split('|')[0]);
		}

		const dateComponent = momentObj
			.clone()
			.date(clickedDate)
			.toISOString()
			.split('T')[0];

		const newMomentObj = moment(dateComponent + 'T' + currentTime);
		callBack(newMomentObj);
	};

	const renderDays = () => {
		const components = [];

		// Get weekday of first of month as int to create "shadow-days" when a month doesnt start on a sunday
		const numOfPlaceholderDays = momentObj.clone().startOf('month').format('e');
		for (let i = 1; i <= numOfPlaceholderDays; i++) {
			components.push(
				<DayOfMonth key={`null ${i} of month`} placeHolder={true} />
			);
		}

		for (let i = 1; i <= momentObj.daysInMonth(); i++) {
			components.push(
				<DayOfMonth
					key={`Day ${i} of month`}
					placeHolder={false}
					day={i}
					// Today is only true when it's today
					today={itIsToday(today, momentObj, i)}
					active={itIsActive(momentObj, i)}
					cbFunc={dateClicked}
					numOfTodos={getNumOfTodosDueThisDay(momentObj, todos, i)}
					dayValues={getDayObject(momentObj, i)}
				/>
			);
		}
		return components;
	};
	return (
		<div className='calendar'>
			<div className='month-view'>
				<div className='month-navigator'>
					<button onClick={prevMonth}>Prev month</button>
					<h2 className='current-month'>
						<i>
							{momentObj.format('MMMM')} - {momentObj.format('YYYY')}
						</i>
					</h2>
					<button onClick={nextMonth}>Next month</button>
				</div>
				<WeekDays />
				<div className='grid-container calender-days'>{renderDays()}</div>
			</div>

			{/* <p>Loading...</p> */}
		</div>
	);
}

export default CalenderView;

function getNumOfTodosDueThisDay(momentObj, todos, i) {
	const compareDate = momentObj.clone().set('date', i).format('YYYY-MM-DD');

	// Get totalnumber of todos for this day
	const todosDueThisDay = todos.filter(
		(todo) => todo.deadline.split('T')[0] === compareDate
	);

	// Get number of incomplete todos for this day
	const incompleteTodosDueThisDay = todosDueThisDay.filter(
		(todo) => !todo.completed
	);

	const totalNum = todosDueThisDay.length;
	const incompleteNum = incompleteTodosDueThisDay.length;
	return [totalNum, incompleteNum];
}

function itIsActive(momentObj, activeDayAsInt) {
	const activeDayFormatted = parseInt(momentObj.clone().format('D'), 10);
	return activeDayFormatted === activeDayAsInt;
}

function itIsToday(todayObj, momentObj, todayAsInt) {
	const todayFormattedDate = parseInt(todayObj.clone().format('D'), 10);
	const todayFormattedMonth = parseInt(todayObj.clone().format('MM'), 10);
	const todayFormattedYear = parseInt(todayObj.clone().format('YYYY'), 10);

	const momentObjFormattedMonth = parseInt(momentObj.clone().format('MM'), 10);
	const momentObjFormattedYear = parseInt(momentObj.clone().format('YYYY'), 10);

	return (
		todayFormattedDate === todayAsInt &&
		todayFormattedMonth === momentObjFormattedMonth &&
		todayFormattedYear === momentObjFormattedYear
	);
}

function getDayObject(momentObj, dayAsInt) {
	let yearNum;
	let monthNum;
	let datehNum;
	if (dayAsInt > 0) {
		yearNum = momentObj.clone().format('YYYY').toString();
		monthNum = momentObj.clone().format('MM').toString();
		datehNum = momentObj.clone().set('date', dayAsInt).format('DD').toString();
	} else {
		yearNum = momentObj.clone().format('YYYY').toString();
		monthNum = momentObj.clone().format('MM').toString();
		datehNum = momentObj.clone().format('DD').toString();
	}

	let dayInArray;
	if (localStorage.getItem(`year-${yearNum}-holidays`)) {
		dayInArray = JSON.parse(
			localStorage.getItem(`year-${yearNum}-holidays`)
		).find((day) => day.datum === `${yearNum}-${monthNum}-${datehNum}`);
	}

	return dayInArray;
}
