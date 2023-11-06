import {REFRESH_TOKEN, REFRESH_TOKEN__FAILURE, REFRESH_TOKEN__SUCCESS} from "../actions/update-token";

const initialState = {
    isLoading: false,
    error: null,
    success: true,
    accessToken: null,
    refreshToken: null
}

export const updateTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case REFRESH_TOKEN: {
            return {...state, isLoading: true}
        }
        case REFRESH_TOKEN__SUCCESS: {
            return {...state, isLoading: false, success: true, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken}
        }
        case REFRESH_TOKEN__FAILURE: {
            return {...state, isLoading: false, error: action.payload, success: false}
        }
        default: {
            return state
        }
    }
}