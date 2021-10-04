import { useState } from 'react';

import './TodoView.css';

function TodoView({ todoObj, toggleCompleteTodo, deleteTodo, beginEdit }) {
	const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

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
