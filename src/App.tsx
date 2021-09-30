import './App.css';
import AllTodos from './Components/AllTodos';
import Calendar from './Components/Calendar';
import DailyTodos from './Components/DailyTodos';

// DailyTodos
// AllTodos
// Calendar

function App() {
	return (
		<div className='App container'>
			<AllTodos />
			<Calendar />
			<DailyTodos />
		</div>
	);
}

export default App;
