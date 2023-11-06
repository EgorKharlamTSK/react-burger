import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST__FAILURE,
    RESET_PASSWORD_REQUEST__SUCCESS
} from "../actions/reset-password";

const initialState = {
    success: false,
    message: null,
    isLoading: false
}


export const resetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST: {
            return {...state, isLoading: true}
        }
        case RESET_PASSWORD_REQUEST__SUCCESS: {
            return {...state, success: true, message: action.payload.message}
        }
        case RESET_PASSWORD_REQUEST__FAILURE: {
            return {...state, isLoading: false, success: false}
        }
        default: {
            return state
        }
    }
}