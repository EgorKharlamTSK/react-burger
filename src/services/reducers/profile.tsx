import {
    CHECK_AUTH, CHECK_AUTH__FAILURE, CHECK_AUTH__SUCCESS,
    EDIT_PROFILE, EDIT_PROFILE__FAILURE,
    EDIT_PROFILE__SUCCESS,
    GET_PROFILE_INFO,
    GET_PROFILE_INFO__FAILURE,
    GET_PROFILE_INFO__SUCCESS, RESET_PROFILE
} from "../actions/profile";

const initialState = {
    success: false,
    user: {
        email: null,
        name: null
    },
    isLoading: false,
    isAuth: false,
    isAuthLoading: false
}

export const profileInfoReducer = (state = initialState, action: { type: any; payload: { user: string; }; }) => {
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
        case CHECK_AUTH: {
            return {...state, isAuthLoading: true}
        }
        case CHECK_AUTH__SUCCESS: {
            return {...state, isAuth: action.payload, isAuthLoading: false}
        }
        case CHECK_AUTH__FAILURE: {
            return {...state, isAuth: action.payload, isAuthLoading: false}
        }
        case RESET_PROFILE: {
            return initialState
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