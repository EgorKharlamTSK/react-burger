import {
    AUTH_REQUEST,
    AUTH_REQUEST__FAILURE,
    AUTH_REQUEST__SUCCESS,
    FORGOT_PASSWORD, FORGOT_PASSWORD__FAILURE,
    FORGOT_PASSWORD__SUCCESS, forgotPass, RESET_AUTH
} from "../actions/auth";

const initialState = {
    success: false,
    accessToken: null,
    refreshToken: null,
    user: {
        email: null,
        name: null
    },
    isLoading: false,
    forgotPassword: {
        onSendMail: false,
        isLoadingPasswordReq: false,
        success: false,
        message: null
    }
}

export const authReducer = (state = initialState, action: { type: any; payload: { user: string; accessToken: string; refreshToken: string; success: boolean; message: string; }; }) => {
    switch (action.type) {
        case AUTH_REQUEST: {
            return {...state, isLoading: true}
        }
        case AUTH_REQUEST__SUCCESS: {
            return {...state, isLoading: false, success: true, user: action.payload.user, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken}
        }
        case AUTH_REQUEST__FAILURE: {
            return {...state, isLoading: false, errorMessage: action.payload, success: false}
        }
        case RESET_AUTH: {
            return initialState
        }
        case FORGOT_PASSWORD: {
            return {...state, forgotPassword: {...state.forgotPassword, isLoadingPasswordReq: true, onSendMail: true}}
        }
        case FORGOT_PASSWORD__SUCCESS: {
            return {...state, forgotPassword: {...state.forgotPassword, success: action.payload.success, message: action.payload.message, isLoadingPasswordReq: false}}
        }
        case FORGOT_PASSWORD__FAILURE: {
            return {...state, forgotPassword: {...state.forgotPassword, success: action.payload.success, isLoadingPasswordReq: false, message:action.payload.message }}
        }
        default: {
            return state
        }
    }
}