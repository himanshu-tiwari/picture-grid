import React from 'react';
import './App.scss';
import SearchBar from './components/SearchBar';
import PictureGrid from './components/PictureGrid';

const App = props => {
	return <div className="App">
		<header>
			<SearchBar />
		</header>

		<PictureGrid />
	</div>;
};

export default App;
