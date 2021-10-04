import AllTodos from './AllTodos';

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

	console.log(currentDayInFocus);
	console.log(todos);

	return (
		<div className='DailyTodos'>
			<AllTodos
				todos={todos}
				todoDeadline={currentDayInFocus}
				isInDaily={true}
				toggleCompleteTodo={toggleCompleteTodo}
				beginEdit={beginEdit}
				deleteTodo={deleteTodo}
			/>
		</div>
	);
}

export default DailyTodos;
