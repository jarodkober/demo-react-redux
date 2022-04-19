import * as actions from '../actions/courseActions';
import courseReducer from './courseReducer';

it('should add course when passed CREATE_COURSE_SUCCESS', () => {
	// arrange the object, omitting properties that are not needed for the test
	const initialState = [
		{
			title: 'A'
		},
		{
			title: 'B'
		}
	];

	// declare a new course
	const newCourse = {
		title: 'C'
	};

	// declare the action
	const action = actions.createCourseSuccess(newCourse);

	// act, by calling the reducer and passing the initial state and action
	const newState = courseReducer(initialState, action);

	// assert
	expect(newState.length).toEqual(3);
	expect(newState[0].title).toEqual('A');
	expect(newState[1].title).toEqual('B');
	expect(newState[2].title).toEqual('C');
});

it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
	// arrange
	const initialState = [
		{ id: 1, title: 'A' },
		{ id: 2, title: 'B' },
		{ id: 3, title: 'C' }
	];

	const course = { id: 2, title: 'New Title' };
	const action = actions.updateCourseSuccess(course);

	// act
	const newState = courseReducer(initialState, action);
	const updatedCourse = newState.find((a) => a.id == course.id);
	const untouchedCourse = newState.find((a) => a.id == 1);

	// assert
	expect(updatedCourse.title).toEqual('New Title');
	expect(untouchedCourse.title).toEqual('A');
	expect(newState.length).toEqual(3);
});
