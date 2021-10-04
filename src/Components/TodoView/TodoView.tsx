import { useState } from 'react';
import './TodoView.css';

import { FaEdit, FaTrashAlt, FaCheck, FaCheckCircle } from 'react-icons/fa';

import { Todo } from '../../types';
interface Props {
	todoObj: Todo;
	toggleCompleteTodo: (param: Todo) => void;
	beginEdit: (param: Todo) => void;
	deleteTodo: (param: String) => void;
}

function TodoView(props: Props) {
	const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

	const { todoObj, toggleCompleteTodo, beginEdit, deleteTodo } = props;

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
						<button onClick={cancelConfirmDeleteTodo}>Cancel delete</button>
						<button onClick={confirmDeleteTodo}>Confirm delete</button>
					</>
				) : (
					<>
						<button onClick={handleDeleteTodo}>
							<FaTrashAlt />
						</button>
						<button onClick={handleUpdateTodo}>
							<FaEdit />
						</button>
						<button onClick={handleCompleteTodo}>
							{todoObj.completed ? <FaCheckCircle /> : <FaCheck />}
						</button>
					</>
				)}
			</div>
		</div>
	);
}
export default TodoView;
