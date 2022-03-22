import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as courseActions from '../../redux/actions/courseActions';

class CoursesPage extends React.Component {
	state = {
		course: {
			title: ''
		}
	};

	handleChange = (event) => {
		const course = { ...this.state.course, title: event.target.value };
		this.setState({ course });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.createCourse(this.state.course);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h2>Courses</h2>
				<h3>Add Course</h3>
				<input
					onChange={this.handleChange}
					type="text"
					value={this.state.course.title}
				/>
				<input type="submit" value="Save" />
				{this.props.courses.map((course) => (
					<div key={course.title}>{course.title}</div>
				))}
			</form>
		);
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	createCourse: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		createCourse: (course) => dispatch(courseActions.createCourse(course))
	};
}

function mapStateToProps(state) {
	return {
		courses: state.courses
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
