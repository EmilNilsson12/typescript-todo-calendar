import { FunctionComponent, useEffect, useState } from 'react';
import './App.css';

import AllTodos from './Components/AllTodos';
import DailyTodos from './Components/DailyTodos/DailyTodos';
import TodoForm from './Components/TodoForm/TodoForm';
import CalenderView from './Components/CalenderView/CalenderView';

import moment, { Moment } from 'moment';

import { Todo } from './types';
interface TodoArr {
	todos: Array<Todo>;
}

const App: FunctionComponent = () => {
	const [todos, setTodos] = useState<TodoArr['todos']>([
		{
			title: 'Interview with Emil',
			description: '',
			deadline: '2022-08-29T09:26:23.673Z',
			completed: true,
			id: 'e1a17603-bda9-434f-974a-36ebc9b9b924',
		},
		{
			title: 'Check Emils Github',
			description: '',
			deadline: '2022-08-30T09:26:11.289Z',
			completed: false,
			id: 'c42914d7-77c4-45b3-88ef-f4a196a1c95a',
		},
		{
			title: 'Weekend!',
			description: '',
			deadline: '2022-09-02T09:27:23.570Z',
			completed: false,
			id: '61fe12a4-c115-4407-8e05-0bcb2199f40f',
		},
	]);
	const [currentDayInFocus, setCurrentDayInFocus] = useState(() => moment());

	const updateMomentObjCallback = (newObj: Moment) => {
		setCurrentDayInFocus(newObj);
	};

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
		deleteTodo: (id: String) => {
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
			<AllTodos
				todos={todos}
				updateMomentObjCallback={updateMomentObjCallback}
				toggleCompleteTodo={crudOperations.toggleCompleteTodo}
				beginEdit={crudOperations.updateTodo}
				deleteTodo={crudOperations.deleteTodo}
			/>
			<CalenderView
				todos={todos}
				callBack={updateMomentObjCallback}
				momentObj={currentDayInFocus}
			/>
			<TodoForm initialDeadline={currentDayInFocus} addTodo={handleTodoAdd} />
			<DailyTodos
				todos={todos.filter(
					(todo) =>
						todo.deadline.split('T')[0] ===
						currentDayInFocus.format('YYYY-MM-DD')
				)}
				updateMomentObjCallback={updateMomentObjCallback}
				currentDayInFocus={currentDayInFocus}
				toggleCompleteTodo={crudOperations.toggleCompleteTodo}
				beginEdit={crudOperations.updateTodo}
				deleteTodo={crudOperations.deleteTodo}
			/>
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
