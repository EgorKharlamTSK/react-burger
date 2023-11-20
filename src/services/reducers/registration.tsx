import {
    REGISTRATION_REQUEST,
    REGISTRATION_REQUEST__FAILURE,
    REGISTRATION_REQUEST__SUCCESS
} from "../actions/registration";

const initialState = {
    success: false,
    user: {
        "email": null,
        "name": null
    },
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    errorMessage: null
}

export const registrationReducer = (state = initialState, action: { type: any; payload: { user: string; accessToken: string; refreshToken: string; }; }) => {
    switch (action.type) {
        case REGISTRATION_REQUEST: {
            return {...state, isLoading: true}
        }
        case REGISTRATION_REQUEST__SUCCESS: {
            return {...state, isLoading: false, success: true, user: action.payload.user, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken}
        }
        case REGISTRATION_REQUEST__FAILURE: {
            return {...state, isLoading: false, errorMessage: action.payload, success: false}
        }
        default: {
            return state
        }
    }
}