import { FunctionComponent, useEffect, useState } from 'react';
import './App.css';
import AllTodos from './Components/AllTodos';
import Calendar from './Components/Calendar';
import DailyTodos from './Components/DailyTodos';
import TodoForm from './Components/TodoForm/TodoForm';

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

	return (
		<div className='App container'>
			<AllTodos todos={todos} />
			<Calendar />
			<TodoForm addTodo={handleTodoAdd} />
			<DailyTodos />
		</div>
	);
};

export default App;
