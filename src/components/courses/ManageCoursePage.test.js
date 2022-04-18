import React from 'react';

import { mount } from 'enzyme';

import { authors, courses, newCourse } from '../../../tools/mockData';
import { ManageCoursePage } from './ManageCoursePage';

function render(args) {
	const defaultProps = {
		authors,
		course: newCourse,
		courses,
		// Passed from React Router in real app, so just stubbing in for test.
		// Could also choose to use MemoryRouter as shown in Header.test.js,
		// or even wrap with React Router, depending on whether I
		// need to test React Router related behavior.
		history: {},
		loadAuthors: jest.fn(),
		loadCourses: jest.fn(),
		match: {},
		saveCourse: jest.fn()
	};

	const props = { ...defaultProps, ...args };

	return mount(<ManageCoursePage {...props} />);
}

it('sets error when attempting to save an empty title field', () => {
	const wrapper = render();
	wrapper.find('form').simulate('submit');
	const error = wrapper.find('.alert').first();
	expect(error.text()).toBe('Title is required.');
});
