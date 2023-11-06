import {URL} from "../../utils/constants";
import {checkResponse} from "../../utils/check-response";
import {reduxRequest} from "../../utils/redux-request";
import {CHECK_AUTH, checkAuth, RESET_PROFILE} from "./profile";
import {RESET_AUTH} from "./auth";

export const QUIT_REQUEST = "QUIT_REQUEST"
export const QUIT__SUCCESS = "QUIT__SUCCESS"
export const QUIT__FAILURE = "QUIT__FAILURE"

export const quitUser = (token) => (dispatch) => {
    dispatch({type: QUIT_REQUEST})

    const data = {
        token: token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    }

    reduxRequest(`${URL}/auth/logout`, options)
        .then((data) => {
            dispatch({type: QUIT__SUCCESS, payload: data})
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            dispatch({type: RESET_AUTH})
            dispatch({type: RESET_PROFILE})
            dispatch(checkAuth())
        })
        .catch((error) => {
            dispatch({type: QUIT__FAILURE, payload: error.message})
        })
}