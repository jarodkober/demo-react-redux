import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CourseList from './CourseList';
import * as courseActions from '../../redux/actions/courseActions';

class CoursesPage extends React.Component {
	componentDidMount() {
		this.props.actions.loadCourses().catch((error) => {
			alert('Loading courses failed' + error);
		});
	}
	render() {
		return (
			<>
				<h2>Courses</h2>
				<CourseList courses={this.props.courses} />
			</>
		);
	}
}

CoursesPage.propTypes = {
	actions: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

function mapStateToProps(state) {
	console.log(state.courses);
	return {
		courses: state.courses
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
