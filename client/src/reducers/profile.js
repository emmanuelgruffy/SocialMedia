import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES, GET_REPOS } from "../actions/types";

const initialState = {
    profile: null, // the logged-in user profile
    profiles: [], // for the profile pages user will visit
    repos: [], //for the gitHub repos we are fetching
    loading: true,
    error: {}
}

export default function(state= initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
               ...state,
               profiles: payload,
               loading: false 
            }
        case GET_PROFILE:
        case UPDATE_PROFILE:    
            return {
                ...state,
                profile: payload, //this is the axios res.data get from /api/profile/me
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }; 
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }   
        default:
            return state;       
    }
}