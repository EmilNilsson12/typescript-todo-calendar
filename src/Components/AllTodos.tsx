// import { FunctionComponent } from 'react';

interface Todo {
	title: String;
}

interface Props {
	todos: Array<Todo>;
	// alt
	// todos: Todo[];
}

const AllTodos = (props: Props) => {
	const { todos } = props;
	console.log('todos: ', todos);
	console.log('todos length: ', todos.length);

	return (
		<div className='AllTodos'>
			{todos.map((todo, i) => (
				<div key={i}>Title: {todo.title}</div>
			))}
		</div>
	);
};

export default AllTodos;
