import { applyMiddleware, compose, createStore } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore(initialState) {
	// Add support for Redux dev tools
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	return createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
	);
}
