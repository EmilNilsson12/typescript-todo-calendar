import TodoView from './TodoView/TodoView';

import { Moment } from 'moment';

import { Todo } from '../types';
interface Props {
	todos: Array<Todo>;
	todoDeadline: Moment;
	isInDaily: Boolean;
	toggleCompleteTodo: (obj: Todo) => void;
	beginEdit: (obj: Todo) => void;
	deleteTodo: (id: String) => void;
}

const AllTodos = (props: Props) => {
	const {
		todos,
		todoDeadline,
		isInDaily,
		toggleCompleteTodo,
		beginEdit,
		deleteTodo,
	} = props;

	return (
		<div className='AllTodos'>
			{todoDeadline.format('YYYY-MM-DD')}
			{todos.map((todo, i) => (
				<TodoView
					todoObj={todo}
					toggleCompleteTodo={toggleCompleteTodo}
					beginEdit={beginEdit}
					deleteTodo={deleteTodo}
					isInDaily={isInDaily}
				/>
				// <div key={i}>Title: {todo.title}</div>
			))}
		</div>
	);
};

export default AllTodos;
