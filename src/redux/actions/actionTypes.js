export const API_CALL_ERROR = 'API_CALL_ERROR';
export const BEGIN_API_CALL = 'BEGIN_API_CALL';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const LOAD_COURSES_SUCCESS = 'LOAD_COURSES_SUCCESS';
export const LOAD_AUTHORS_SUCCESS = 'LOAD_AUTHORS_SUCCESS';
export const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS';

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. In this case we're doing an optimistic delete, so we're hiding the loading state and
// this action deliberately omits the "_SUCCESS" suffix. If it had one the apiCallsInProgress counter
// would be decremented below zero because we're not incrementing the number of calls when the
// delete request begins.
export const DELETE_COURSE_OPTIMISTIC = 'DELETE_COURSE_OPTIMISTIC';
