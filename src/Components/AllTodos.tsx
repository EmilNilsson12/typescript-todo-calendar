import TodoView from './TodoView/TodoView';

import { Todo } from '../types';
interface Props {
	todos: Array<Todo>;
	toggleCompleteTodo: (obj: Todo) => void;
	beginEdit: (obj: Todo) => void;
	deleteTodo: (id: String) => void;
}

const AllTodos = (props: Props) => {
	const { todos, toggleCompleteTodo, beginEdit, deleteTodo } = props;

	return (
		<div className='AllTodos'>
			{todos.map((todo, i) => (
				<TodoView
					todoObj={todo}
					toggleCompleteTodo={toggleCompleteTodo}
					beginEdit={beginEdit}
					deleteTodo={deleteTodo}
					isInDaily={false}
				/>
				// <div key={i}>Title: {todo.title}</div>
			))}
		</div>
	);
};

export default AllTodos;
