import TodoView from './TodoView/TodoView';

import { Moment } from 'moment';

import { Todo } from '../types';
import ListTodosForDay from './ListTodosForDay';
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

	return (
		<div className='DailyTodos'>
			<ListTodosForDay
				todos={todos}
				currentDayInFocus={currentDayInFocus}
				toggleCompleteTodo={toggleCompleteTodo}
				beginEdit={beginEdit}
				deleteTodo={deleteTodo}
			/>
		</div>
	);
}

export default DailyTodos;
