import { FunctionComponent, useEffect, useState } from 'react';
import './App.css';
import AllTodos from './Components/AllTodos';
import Calendar from './Components/Calendar';
import DailyTodos from './Components/DailyTodos';

// DailyTodos
// AllTodos
// Calendar

interface Todo {
	title: String;
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
		console.log('todos updated');
		console.log('todos: ', todos);
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const handleClick = () => {
		console.log('Button clicked');
		const copyOfTodos: TodoArr['todos'] = [...todos, { title: 'hello' }];
		console.log('copyOfTodos: ', copyOfTodos);
		setTodos(copyOfTodos);
		localStorage.setItem('todos', JSON.stringify(todos));
	};

	return (
		<div className='App container'>
			<button onClick={handleClick}>Add todo</button>
			<AllTodos todos={todos} />
			<Calendar />
			<DailyTodos />
		</div>
	);
};

export default App;
