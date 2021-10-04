import TodoView from './TodoView/TodoView';

import ListTodosForDay from './ListTodosForDay';
import compareByDates from '../utils/compareByDate';

import { Moment } from 'moment';

import { Todo } from '../types';

interface Props {
	todos: Array<Todo>;
	currentDayInFocus: Moment;
	toggleCompleteTodo: (obj: Todo) => void;
	beginEdit: (obj: Todo) => void;
	deleteTodo: (id: String) => void;
}

function DailyTodos(props: Props) {
	const {
		todos,
		currentDayInFocus,
		toggleCompleteTodo,
		beginEdit,
		deleteTodo,
	} = props;

	let sortedByTime = [...todos.sort(compareByDates)];

	return (
		<div className='DailyTodos'>
			<h2>Todos due: {currentDayInFocus.format('YYYY-MM-DD')}</h2>
			<ListTodosForDay
				todos={sortedByTime}
				toggleCompleteTodo={toggleCompleteTodo}
				beginEdit={beginEdit}
				deleteTodo={deleteTodo}
			/>
		</div>
	);
}

export default DailyTodos;
