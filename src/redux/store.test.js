import { createStore } from 'redux';

import * as courseActions from './actions/courseActions';
import rootReducer from './reducers';
import initialState from './reducers/initialState';

it('Should handle creating courses', function () {
	// arrange by creating the initial store with the root reducer and initial state
	const store = createStore(rootReducer, initialState);

	// declare a course object with only the properties needed for the test
	const course = {
		title: 'Clean Code'
	};

	// act by getting the action to create a course and dispatching it
	const action = courseActions.createCourseSuccess(course);
	store.dispatch(action);

	// assert by getting the updated state and verify it matches the object declared above
	const createdCourse = store.getState().courses[0];
	expect(createdCourse).toEqual(course);
});
