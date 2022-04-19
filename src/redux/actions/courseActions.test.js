import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

import * as types from './actionTypes';
import * as courseActions from './courseActions';
import { courses } from '../../../tools/mockData';

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async actions', () => {
	afterEach(() => {
		// re-initialize fetchMock after each test to keep the tests atomic
		fetchMock.restore();
	});

	describe('Load Courses Thunk', () => {
		it('should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses', () => {
			// Mimic the API calls by capturing all fetch calls and respond with mock data
			fetchMock.mock('*', {
				body: courses,
				headers: { 'content-type': 'application/json' }
			});

			// Declare the actions that should be fired by the thunk
			const expectedActions = [
				{ type: types.BEGIN_API_CALL },
				{ type: types.LOAD_COURSES_SUCCESS, courses }
			];

			// Initialize the mock store with an empty array of courses
			const store = mockStore({ courses: [] });

			// Dispatch and verify the expected actions
			return store.dispatch(courseActions.loadCourses()).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});
	});
});

describe('createCourseSuccess', () => {
	it('should create a CREATE_COURSE_SUCCESS action', () => {
		// arrange
		const course = courses[0];
		const expectedAction = {
			course,
			type: types.CREATE_COURSE_SUCCESS
		};

		// act
		const action = courseActions.createCourseSuccess(course);

		// assert
		expect(action).toEqual(expectedAction);
	});
});
