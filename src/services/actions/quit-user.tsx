import {URL} from "../../utils/constants";
import {reduxRequest} from "../../utils/redux-request";
import {checkAuth, IResetProfile, RESET_PROFILE} from "./profile";
import {IAuthReset, RESET_AUTH} from "./auth";
import {AppDispatch, AppThunkAction} from "../../utils/types";

export const QUIT_REQUEST = "QUIT_REQUEST"
export const QUIT__SUCCESS = "QUIT__SUCCESS"
export const QUIT__FAILURE = "QUIT__FAILURE"

// export const quitUser = (token: string): any => (dispatch: TDispatch): any => {
//     dispatch({type: QUIT_REQUEST})
//
//     const data = {
//         token: token
//     }
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(data),
//     }
//
//     reduxRequest(`${URL}/auth/logout`, options, dispatch)
//         .then((data) => {
//             dispatch({type: QUIT__SUCCESS, payload: data})
//             localStorage.removeItem("accessToken")
//             localStorage.removeItem("refreshToken")
//             dispatch({type: RESET_AUTH})
//             dispatch({type: RESET_PROFILE})
//             dispatch(checkAuth())
//         })
//         .catch((error) => {
//             dispatch({type: QUIT__FAILURE, payload: error.message})
//         })
// }

interface IQuitRequestAction {
    type: typeof QUIT_REQUEST;
}

interface IQuitSuccessAction {
    type: typeof QUIT__SUCCESS;
    payload: { message: string };
}

interface IQuitFailureAction {
    type: typeof QUIT__FAILURE;
    payload: string;
}

export type TQuitActionTypes = IQuitRequestAction | IQuitSuccessAction | IQuitFailureAction | IAuthReset | IResetProfile;

export const quitUser = (token: string): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({ type: QUIT_REQUEST })
    const data = {token: token};

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(data)
    };

    reduxRequest(`${URL}/auth/logout`, options, dispatch)
        .then((data) => {
            dispatch({type: QUIT__SUCCESS, payload: data})
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch({type: RESET_AUTH});
            dispatch({type: RESET_PROFILE});
            dispatch(checkAuth())
        })
        .catch((error) => {
            dispatch({type: QUIT__FAILURE, payload: error.message});
        });
}
