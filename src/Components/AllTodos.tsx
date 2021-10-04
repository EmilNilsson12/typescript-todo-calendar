import compareByDates from '../utils/compareByDate';

import ListTodosForDay from './ListTodosForDay';

import { Todo } from '../types';
import { Moment } from 'moment';
interface Props {
	todos: Array<Todo>;
	updateMomentObjCallback: (date: Moment) => void;
	toggleCompleteTodo: (obj: Todo) => void;
	beginEdit: (obj: Todo) => void;
	deleteTodo: (id: String) => void;
}

const AllTodos = (props: Props) => {
	const {
		todos,
		updateMomentObjCallback,
		toggleCompleteTodo,
		beginEdit,
		deleteTodo,
	} = props;

	// Sort all todos by date
	let sortedAndByDueDate = [...todos.sort(compareByDates)];

	// Creata new Set of all dates with todos
	const setOfTodoDates = new Set();
	for (const todo of sortedAndByDueDate) {
		setOfTodoDates.add(todo.deadline.split('T')[0]);
	}
	const setOfTodoDatesArr = Array.from(setOfTodoDates);

	// Create array of arrays
	const filteredTodosByDate: any = [];
	for (const date of setOfTodoDatesArr) {
		filteredTodosByDate.push(
			sortedAndByDueDate.filter((todo) => todo.deadline.split('T')[0] === date)
		);
	}

	const mapReturnArr = () => {
		const returnArr = [];

		for (const dateWithTodos of filteredTodosByDate) {
			returnArr.push(
				<ListTodosForDay
					key={dateWithTodos[0].deadline}
					updateMomentObjCallback={updateMomentObjCallback}
					allTodos={true}
					todos={dateWithTodos}
					toggleCompleteTodo={toggleCompleteTodo}
					beginEdit={beginEdit}
					deleteTodo={deleteTodo}
				/>
			);
		}
		return returnArr.length ? (
			returnArr
		) : (
			<div className='AllTodos'>No todos yet...</div>
		);
	};
	return (
		<div className='AllTodos'>
			<h2>All todos</h2>
			{mapReturnArr()}
		</div>
	);
};

export default AllTodos;
