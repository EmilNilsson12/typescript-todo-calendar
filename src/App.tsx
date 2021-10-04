import { FunctionComponent, useEffect, useState } from 'react';
import './App.css';
import AllTodos from './Components/AllTodos';
import DailyTodos from './Components/DailyTodos';
import TodoForm from './Components/TodoForm/TodoForm';
import moment from 'moment';
import CalenderView from './Components/CalenderView/CalenderView';

// DailyTodos
// AllTodos
// Calendar

interface Todo {
	title: String;
	description: String;
	deadline: String;
	completed: Boolean;
	id: String;
}

interface TodoArr {
	todos: Array<Todo>;
}

const App: FunctionComponent = () => {
	const [todos, setTodos] = useState<TodoArr['todos']>([]);

	// Initial assignment
	useEffect(() => {
		if (!localStorage.getItem('todos')) {
			localStorage.setItem('todos', JSON.stringify(todos));
		} else {
			const lsString = localStorage.getItem('todos');
			const lsParsed = JSON.parse(lsString || '[]');
			setTodos(lsParsed);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const handleTodoAdd = (todoObj: Todo) => {
		console.log('Button clicked');
		const copyOfTodos: TodoArr['todos'] = [...todos, todoObj];
		console.log('copyOfTodos: ', copyOfTodos);
		setTodos(copyOfTodos);
		localStorage.setItem('todos', JSON.stringify(todos));
	};

	const crudOperations = {
		addTodo: (todoObj: Todo) => {
			// Make copy of todos array
			const copyOfTodos = [...todos];

			customHookSetTodos(copyOfTodos, setTodos, todoObj);
		},
		deleteTodo: (id: string) => {
			// Make copy of todos array
			// and filter out the deleted todo
			const copyOfTodos = [...todos].filter((todo) => todo.id !== id);

			// Replace todos with copyOfTodos
			customHookSetTodos(copyOfTodos, setTodos, { skipMe: true });
		},
		toggleCompleteTodo: ({ id }: Todo) => {
			// Find relevant entry from saved todos
			const todoToBeUpdated = todos.find((todo) => todo.id === id);

			if (todoToBeUpdated) {
				// Update completed-property to opposite of its inital value
				todoToBeUpdated.completed = !todoToBeUpdated.completed;
			}

			// Make copy of todos array
			// and filter out the deleted todo
			const copyOfTodos = [...todos].filter((todo) => todo.id !== id);

			customHookSetTodos(copyOfTodos, setTodos, todoToBeUpdated);
		},
		updateTodo: (updatedTodoObj: Todo) => {
			// Make copy of todos array
			// and filter out the deleted todo
			const copyOfTodos = [...todos].filter(
				(todo) => todo.id !== updatedTodoObj.id
			);

			customHookSetTodos(copyOfTodos, setTodos, updatedTodoObj);
		},
	};

	return (
		<div className='App container'>
			<AllTodos todos={todos} />
			<CalenderView todos={todos} crudOperations={crudOperations} />
			<TodoForm initialDeadline={moment()} addTodo={handleTodoAdd} />
			<DailyTodos />
		</div>
	);
};

export default App;

function customHookSetTodos(
	array: Todo[],
	hookCallback: (array: Todo[]) => void,
	object: any
) {
	// Add new version of object to array
	// unless object is missing
	if (!object.skipMe) array.push(object);

	// Replace todos with copyOfTodos
	hookCallback(array);
}
