import {
    REGISTRATION_REQUEST,
    REGISTRATION_REQUEST__FAILURE,
    REGISTRATION_REQUEST__SUCCESS, TRegistrationRequest
} from "../actions/registration";

interface IDataUser {
    email: string,
    name: string
}

interface IInitialStateReq {
    success: boolean,
    user: IDataUser,
    accessToken: string,
    refreshToken: string,
    isLoading: boolean,
    errorMessage: string
}

const initialState: IInitialStateReq = {
    success: false,
    user: {
        email: '',
        name: ''
    },
    accessToken: '',
    refreshToken: '',
    isLoading: false,
    errorMessage: ''
}

export const registrationReducer = (state = initialState, action: TRegistrationRequest): IInitialStateReq=> {
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