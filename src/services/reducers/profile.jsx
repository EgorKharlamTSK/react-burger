import {
    EDIT_PROFILE, EDIT_PROFILE__FAILURE,
    EDIT_PROFILE__SUCCESS,
    GET_PROFILE_INFO,
    GET_PROFILE_INFO__FAILURE,
    GET_PROFILE_INFO__SUCCESS
} from "../actions/profile";

const initialState = {
    success: false,
    user: {
        email: null,
        name: null
    },
    isLoading: false
}

export const profileInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_INFO: {
            return {...state, isLoading: true}
        }
        case GET_PROFILE_INFO__SUCCESS: {
            return {...state, isLoading: false, success: true, user: action.payload.user}
        }
        case GET_PROFILE_INFO__FAILURE: {
            return {...state, isLoading: false, success: false}
        }
        case EDIT_PROFILE: {
            return {...state, isLoading: true}
        }
        case EDIT_PROFILE__SUCCESS: {
            return {...state, isLoading: false, success: true, user: action.payload.user}
        }
        case EDIT_PROFILE__FAILURE:{
            return {...state, isLoading: false, success: false}
        }
        default: {
            return state
        }
    }
}