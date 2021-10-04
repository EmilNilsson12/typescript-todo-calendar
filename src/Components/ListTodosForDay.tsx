import TodoView from './TodoView/TodoView';

import { Todo } from '../types';
import moment, { Moment } from 'moment';
interface Props {
	todos: Array<Todo>;
	allTodos: Boolean;
	updateMomentObjCallback: (date: Moment) => void;
	toggleCompleteTodo: (obj: Todo) => void;
	beginEdit: (obj: Todo) => void;
	deleteTodo: (id: String) => void;
}

function ListTodosForDay(props: Props) {
	const {
		todos,
		allTodos,
		updateMomentObjCallback,
		toggleCompleteTodo,
		beginEdit,
		deleteTodo,
	} = props;

	const handleClick = (evt: any) => {
		const timeComponent = moment().toISOString().split('T')[1];
		const clickedDate = moment(evt.target.innerText + 'T' + timeComponent);

		updateMomentObjCallback(clickedDate);
	};

	return (
		<div className='DailyTodos'>
			{allTodos ? (
				<>
					{' '}
					Jump to {'-->'}
					<button onClick={handleClick}>
						{todos[0]?.deadline?.split('T')[0]}
					</button>
				</>
			) : (
				<></>
			)}
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
