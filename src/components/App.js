import React from 'react';

import { Route } from 'react-router-dom';

import AboutPage from './about/AboutPage';
import Header from './common/Header';
import HomePage from './home/HomePage';
import PageNotFound from './PageNotFound';

function App() {
	return (
		<div className="container-fluid">
			<Header />
			<Route exact path="/" component={HomePage} />
			<Route path="/about" component={AboutPage} />
		</div>
	);
}

export default App;
