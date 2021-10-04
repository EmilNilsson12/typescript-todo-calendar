import TodoView from './TodoView/TodoView';

import { Moment } from 'moment';

import { Todo } from '../types';
interface Props {
	todos: Array<Todo>;
	currentDayInFocus: Moment;
	toggleCompleteTodo: (obj: Todo) => void;
	beginEdit: (obj: Todo) => void;
	deleteTodo: (id: String) => void;
}

function ListTodosForDay(props: Props) {
	const {
		todos,
		currentDayInFocus,
		toggleCompleteTodo,
		beginEdit,
		deleteTodo,
	} = props;

	return (
		<div className='DailyTodos'>
			{currentDayInFocus.format('YYYY-MM-DD')}
			{todos.map((todo) => (
				<TodoView
					key={todo.id}
					todoObj={todo}
					toggleCompleteTodo={toggleCompleteTodo}
					beginEdit={beginEdit}
					deleteTodo={deleteTodo}
				/>
			))}
		</div>
	);
}

export default ListTodosForDay;
