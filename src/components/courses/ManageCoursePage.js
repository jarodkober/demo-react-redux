import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';

class ManageCoursePage extends React.Component {
	componentDidMount() {
		const { authors, courses, loadAuthors, loadCourses } = this.props;

		if (courses.length === 0) {
			loadCourses().catch((error) => {
				alert('Loading courses failed' + error);
			});
		}

		if (authors.length === 0) {
			loadAuthors().catch((error) => {
				alert('Loading authors failed' + error);
			});
		}
	}
	render() {
		return (
			<>
				<h2>Manage Course</h2>
			</>
		);
	}
}

ManageCoursePage.propTypes = {
	authors: PropTypes.array.isRequired,
	courses: PropTypes.array.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	loadCourses: PropTypes.func.isRequired
};

const mapDispatchToProps = {
	loadAuthors: authorActions.loadAuthors,
	loadCourses: courseActions.loadCourses
};

function mapStateToProps(state) {
	return {
		authors: state.authors,
		courses: state.courses
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
