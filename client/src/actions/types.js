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
export const GET_PROFILES = 'GET_PROFILES';
export const PROFILE_ERROR = 'PROFILE_ERROR';

//clear profile on logout (otherwise new login will get the state of last logged profile)
export const CLEAR_PROFILE = 'CLEAR_PROFILE';

//update profile
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

//get github repos
export const GET_REPOS = 'GET_REPOS';

//delete account
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED';

//post
export const GET_POSTS = 'GET_POSTS';
export const POST_ERROR = 'POST_ERROR';
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST';
export const GET_POST = 'GET_POST';

//likes
export const UPDATE_LIKES = 'UPDATE_LIKES';

//comments
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';



