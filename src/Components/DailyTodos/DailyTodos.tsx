import ListTodosForDay from '../ListTodosForDay';

import './DailyTodos.css';

import compareByDates from '../../utils/compareByDate';

import { Moment } from 'moment';
import { Todo } from '../../types';
interface Props {
	todos: Array<Todo>;
	currentDayInFocus: Moment;
	updateMomentObjCallback: (date: Moment) => void;
	toggleCompleteTodo: (obj: Todo) => void;
	beginEdit: (obj: Todo) => void;
	deleteTodo: (id: String) => void;
}

function DailyTodos(props: Props) {
	const {
		todos,
		currentDayInFocus,
		updateMomentObjCallback,
		toggleCompleteTodo,
		beginEdit,
		deleteTodo,
	} = props;

	let sortedByTime = [...todos.sort(compareByDates)];

	return (
		<div className='DailyTodos'>
			<h2>
				Todos due:{' '}
				<span className='current-day-in-focus-header'>
					{currentDayInFocus.format('YYYY-MM-DD')}
				</span>
			</h2>
			<ListTodosForDay
				todos={sortedByTime}
				updateMomentObjCallback={updateMomentObjCallback}
				allTodos={false}
				toggleCompleteTodo={toggleCompleteTodo}
				beginEdit={beginEdit}
				deleteTodo={deleteTodo}
			/>
		</div>
	);
}

export default DailyTodos;
