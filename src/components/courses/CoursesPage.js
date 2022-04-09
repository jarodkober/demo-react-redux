import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CourseList from './CourseList';
import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';

class CoursesPage extends React.Component {
	componentDidMount() {
		const { actions, authors, courses } = this.props;

		if (courses.length === 0) {
			actions.loadCourses().catch((error) => {
				alert('Loading courses failed' + error);
			});
		}

		if (authors.length === 0) {
			actions.loadAuthors().catch((error) => {
				alert('Loading authors failed' + error);
			});
		}
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
	authors: PropTypes.array.isRequired,
	courses: PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadAuthors: bindActionCreators(
				authorActions.loadAuthors,
				dispatch
			),
			loadCourses: bindActionCreators(courseActions.loadCourses, dispatch)
		}
	};
}

function mapStateToProps(state) {
	return {
		authors: state.authors,
		courses:
			state.authors.length === 0
				? []
				: state.courses.map((course) => {
						return {
							...course,
							authorName: state.authors.find(
								(a) => a.id === course.authorId
							).name
						};
				  })
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
