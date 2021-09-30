import { useState, useRef, useEffect } from 'react';

import moment, { Moment } from 'moment';
import { v4 as uuidv4 } from 'uuid';

import './TodoForm.css';

interface Todo {
	title: String;
	description: String;
	deadline: String;
	completed: Boolean;
	id: String;
}

interface Props {
	initialDeadline: Moment;
	addTodo(todoObj: Todo): void;
}

function TodoForm(props: Props) {
	const [inputTitle, setInputTitle] = useState('');
	const [inputDesc, setInputDesc] = useState('');
	const [inputDate, setInputDate] = useState(props.initialDeadline);
	const [inputDateValue, setInputDateValue] = useState(
		inputDate.clone().toISOString().split('T')[0]
	);

	const firstFocusInputElement = useRef(null);

	// inputDate and inputDateValue should update when the form is mounted
	// and when dayToShow is updated

	// dayToShow needs to be anything other than an object

	const handleSubmit = (evt: any) => {
		evt.preventDefault();

		// Get current timestamp
		const newTimeComponent = moment().toISOString().split('T')[1];

		// if (updateMode) {
		// 	setCurrentlyUpdating(false);

		// 	// Send new updateObj to App.js
		// 	updateTodo({
		// 		title: inputTitle,
		// 		description: inputDesc,
		// 		deadline: inputDate
		// 			.toISOString()
		// 			.split('T')[0]
		// 			.concat('T', newTimeComponent),
		// 		id: updateParams.id,
		// 	});
		// } else {
		// 	addTodo({
		// 		title: inputTitle,
		// 		description: inputDesc,
		// 		deadline: inputDate
		// 			.toISOString()
		// 			.split('T')[0]
		// 			.concat('T', newTimeComponent),
		// 		id: uuidv4(),
		// 	});
		// }

		props.addTodo({
			title: inputTitle,
			description: inputDesc,
			deadline: inputDate
				.toISOString()
				.split('T')[0]
				.concat('T', newTimeComponent),
			completed: false,
			id: uuidv4(),
			// title: 'String',
			// description: 'String',
			// deadline: 'String',
			// completed: false,
			// id: uuidv4(),
		});
	};

	const handleTitleChange = ({ target }: any) => {
		setInputTitle(target.value);
	};

	const handleDescriptionChange = ({ target }: any) => {
		setInputDesc(target.value);
	};

	const handleDateChange = ({ target }: any) => {
		let dateComponent = target.value;

		let timeComponent = moment(inputDate).toISOString().split('T')[1];

		let datePlusTime = dateComponent + 'T' + timeComponent;

		let newDate = moment(datePlusTime);

		// setInputDate(newDate);
		setInputDateValue(dateComponent);
	};
	const cancelUpdate = () => {
		setInputTitle('');
		setInputDesc('');
		// setInputDate(moment());
		setInputDateValue(moment().toISOString().split('T')[0]);
	};
	return (
		<form onSubmit={handleSubmit} className='TodoForm'>
			<p>
				<label>Title</label>
				<input
					type='text'
					value={inputTitle}
					onChange={handleTitleChange}
					required
					autoFocus
					ref={firstFocusInputElement}
				/>
			</p>
			<p>
				<label>Additional info</label>
				<textarea value={inputDesc} onChange={handleDescriptionChange} />
			</p>
			<p>
				<label>
					Deadline: {/* <b>{inputDate.endOf('days').fromNow()}</b> */}
				</label>
				<input
					type='date'
					value={inputDateValue}
					onChange={handleDateChange}
					required
				/>
			</p>
			<div className='submit-btn-div'>
				<button type='submit'>Add new Todo</button>
				{/* {updateMode && (
					<button type='button' onClick={cancelUpdate}>
						Cancel
					</button>
				)} */}
			</div>
		</form>
	);
}

export default TodoForm;
