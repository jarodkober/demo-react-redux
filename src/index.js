import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';

import App from './components/App.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

render(
	<Router>
		<App />
	</Router>,
	document.getElementById('app')
);