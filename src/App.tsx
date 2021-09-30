import './App.css';
import Feed from './Components/Feed';
import Logo from './Components/Logo';
import List from './Components/List';
import Menu from './Components/Menu';

// List
// Logo
// Feed
// Menu

function App() {
	return (
		<div className='App container'>
			<List />
			<Logo />
			<Feed />
			<Menu />
		</div>
	);
}

export default App;
