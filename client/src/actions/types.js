//this is where we keep all the action types we have.

//alert types
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

//registrations types:
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

//loading user
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';

//login user:
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

//logout
export const LOGOUT = 'LOGOUT';

//profile
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_ERROR = 'PROFILE_ERROR';

//clear profile on logout (otherwise new login will get the state of last logged profile)
export const CLEAR_PROFILE = 'CLEAR_PROFILE';

//update profile
export const UPDATE_PROFILE = 'UPDATE_PROFILE';