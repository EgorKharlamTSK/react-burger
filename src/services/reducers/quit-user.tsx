import {QUIT__FAILURE, QUIT__SUCCESS, QUIT_REQUEST, TQuitActionTypes} from "../actions/quit-user";

interface IQuitState {
    success: boolean;
    message: string | null;
    isLoading: boolean;
}

const initialState: IQuitState = {
    success: false,
    message: null,
    isLoading: true
}

export const quitReducer = (state = initialState, action: TQuitActionTypes) => {
    switch (action.type) {
        case QUIT_REQUEST: {
            return {...state, isLoading: true};
        }
        case QUIT__SUCCESS: {
            return {...state, isLoading: false, success: true, message: action.payload.message};
        }
        case QUIT__FAILURE: {
            return {...state, isLoading: false, errorMessage: action.payload, success: false};
        }
        default: {
            return state;
        }
    }
}
