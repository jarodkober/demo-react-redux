import * as types from './actionTypes';
import { apiCallError, beginApiCall } from './apiStatusActions';
import * as authorApi from '../../api/authorApi';

export function loadAuthorsSuccess(authors) {
	return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
	return function (dispatch) {
		dispatch(beginApiCall());
		return authorApi
			.getAuthors()
			.then((authors) => {
				dispatch(loadAuthorsSuccess(authors));
			})
			.catch((error) => {
				dispatch(apiCallError(error));
				throw error;
			});
	};
}
