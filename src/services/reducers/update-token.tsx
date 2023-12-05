import {
    REFRESH_TOKEN,
    REFRESH_TOKEN__FAILURE,
    REFRESH_TOKEN__SUCCESS,
    TRefreshTokeAction
} from "../actions/update-token";

interface IInitialStateRefresh {
    isLoading: boolean,
    error: string,
    success: boolean,
    accessToken: string,
    refreshToken: string
}

const initialState: IInitialStateRefresh = {
    isLoading: false,
    error: '',
    success: true,
    accessToken: '',
    refreshToken: ''
}

export const updateTokenReducer = (state = initialState, action: TRefreshTokeAction) => {
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