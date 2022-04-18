import { func } from 'prop-types';
import * as types from './actionTypes';

export function beginApiCall() {
	return {
		type: types.BEGIN_API_CALL
	};
}

export function apiCallError() {
	return {
		type: types.API_CALL_ERROR
	};
}
