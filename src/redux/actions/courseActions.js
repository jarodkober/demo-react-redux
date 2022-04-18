import * as types from './actionTypes';
import { apiCallError, beginApiCall } from './apiStatusActions';
import * as courseApi from '../../api/courseApi';

export function createCourseSuccess(course) {
	return {
		course,
		type: types.CREATE_COURSE_SUCCESS
	};
}

export function deleteCourseOptimistic(course) {
	return { type: types.DELETE_COURSE_OPTIMISTIC, course };
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

export function deleteCourse(course) {
	return function (dispatch) {
		// Performing an optimistic delete, so not dispatching begin/end API call
		// actions, or apiCallError action since we're not showing the loading state for this.
		dispatch(deleteCourseOptimistic(course));
		return courseApi.deleteCourse(course.id);
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
				dispatch(apiCallError(error));
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
				dispatch(apiCallError(error));
				throw error;
			});
	};
}
