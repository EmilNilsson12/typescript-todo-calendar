import TodoView from './TodoView/TodoView';

import { Todo } from '../types';
interface Props {
	todos: Array<Todo>;
	toggleCompleteTodo: (obj: Todo) => void;
	beginEdit: (obj: Todo) => void;
	deleteTodo: (id: String) => void;
}

function ListTodosForDay(props: Props) {
	const { todos, toggleCompleteTodo, beginEdit, deleteTodo } = props;

	return (
		<div className='DailyTodos'>
			{todos[0]?.deadline?.split('T')[0]}
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
