import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import CourseForm from './CourseForm';
import Spinner from '../common/Spinner';
import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import { newCourse } from '../../../tools/mockData';

function ManageCoursePage({
	authors,
	courses,
	history,
	loadAuthors,
	loadCourses,
	saveCourse,
	...props
}) {
	const [course, setCourse] = useState({ ...props.course });
	const [errors, setErrors] = useState({});
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (courses.length === 0) {
			loadCourses().catch((error) => {
				alert('Loading courses failed' + error);
			});
		} else {
			setCourse({ ...props.course });
		}

		if (authors.length === 0) {
			loadAuthors().catch((error) => {
				alert('Loading authors failed' + error);
			});
		}
	}, [props.course]);

	function formIsValid() {
		const { title, authorId, category } = course;
		const errors = {};

		if (!title) errors.title = 'Title is required.';
		if (!authorId) errors.author = 'Author is required';
		if (!category) errors.category = 'Category is required';

		setErrors(errors);
		// Form is valid if the errors object still has no properties
		return Object.keys(errors).length === 0;
	}

	function handleChange(event) {
		const { name, value } = event.target;
		setCourse((prevCourse) => ({
			...prevCourse,
			[name]: name === 'authorId' ? parseInt(value, 10) : value
		}));
	}

	function handleSave(event) {
		event.preventDefault();
		if (!formIsValid()) return;
		setSaving(true);
		saveCourse(course)
			.then(() => {
				toast.success('Course saved.');
				history.push('/courses');
			})
			.catch((error) => {
				setSaving(false);
				setErrors({ onSave: error.message });
			});
	}

	return authors.length === 0 || courses.length === 0 ? (
		<Spinner />
	) : (
		<CourseForm
			authors={authors}
			course={course}
			errors={errors}
			onChange={handleChange}
			onSave={handleSave}
			saving={saving}
		/>
	);
}

ManageCoursePage.propTypes = {
	authors: PropTypes.array.isRequired,
	course: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	history: PropTypes.object.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	loadCourses: PropTypes.func.isRequired,
	saveCourse: PropTypes.func.isRequired
};

const mapDispatchToProps = {
	loadAuthors: authorActions.loadAuthors,
	loadCourses: courseActions.loadCourses,
	saveCourse: courseActions.saveCourse
};

export function getCourseBySlug(courses, slug) {
	return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
	const slug = ownProps.match.params.slug;
	const course =
		slug && state.courses.length > 0
			? getCourseBySlug(state.courses, slug)
			: newCourse;

	return {
		authors: state.authors,
		course,
		courses: state.courses
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
