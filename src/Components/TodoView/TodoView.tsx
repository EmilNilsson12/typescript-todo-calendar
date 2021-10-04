import { useState } from 'react';
import './TodoView.css';

import { Todo } from '../../types';
interface Props {
	todoObj: Todo;
	isInDaily: Boolean;
	toggleCompleteTodo: (param: Todo) => void;
	beginEdit: (param: Todo) => void;
	deleteTodo: (param: String) => void;
}

function TodoView(props: Props) {
	const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

	const { todoObj, toggleCompleteTodo, beginEdit, deleteTodo, isInDaily } =
		props;

	const handleCompleteTodo = () => {
		toggleCompleteTodo(todoObj);
	};

	const handleUpdateTodo = () => {
		beginEdit(todoObj);
	};

	const handleDeleteTodo = () => {
		setConfirmDeleteVisible(true);
	};

	const cancelConfirmDeleteTodo = () => {
		setConfirmDeleteVisible(false);
	};

	const confirmDeleteTodo = () => {
		deleteTodo(todoObj.id);
		setConfirmDeleteVisible(false);
	};

	return (
		<div
			className={`
			todo-view
			${todoObj.completed ? 'todo-completed' : ''}
		`}
		>
			<div>
				<h4>{todoObj.title}</h4>
				{todoObj.description ? <p>{todoObj.description}</p> : <></>}
			</div>
			<div className='todo-btns'>
				{confirmDeleteVisible ? (
					<>
						<button onClick={confirmDeleteTodo}>Confirm delete</button>
						<button onClick={cancelConfirmDeleteTodo}>Cancel delete</button>
					</>
				) : (
					<>
						<button onClick={handleDeleteTodo}>Delete</button>
						<button onClick={handleUpdateTodo}>Update</button>
						<button onClick={handleCompleteTodo}>
							{todoObj.completed ? 'Unmark as complete' : 'Mark as complete'}
						</button>
					</>
				)}
			</div>
		</div>
	);
}
export default TodoView;
