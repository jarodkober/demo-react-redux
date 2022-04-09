import * as types from './actionTypes';
import { beginApiCall } from './apiStatusActions';
import * as courseApi from '../../api/courseApi';

export function createCourseSuccess(course) {
	return {
		course,
		type: types.CREATE_COURSE_SUCCESS
	};
}

export function loadCoursesSuccess(courses) {
	return {
		courses,
		type: types.LOAD_COURSES_SUCCESS
	};
}

export function updateCourseSuccess(course) {
	return {
		course,
		type: types.UPDATE_COURSE_SUCCESS
	};
}

export function loadCourses() {
	return function (dispatch) {
		dispatch(beginApiCall());
		return courseApi
			.getCourses()
			.then((courses) => {
				dispatch(loadCoursesSuccess(courses));
			})
			.catch((error) => {
				throw error;
			});
	};
}

export function saveCourse(course) {
	return function (dispatch) {
		dispatch(beginApiCall());
		return courseApi
			.saveCourse(course)
			.then((savedCourse) => {
				course.id
					? dispatch(updateCourseSuccess(savedCourse))
					: dispatch(createCourseSuccess(savedCourse));
			})
			.catch((error) => {
				throw error;
			});
	};
}
