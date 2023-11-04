import {URL} from "../../utils/constants";
import {checkResponse} from "../../utils/check-response";
import {reduxRequest} from "../../utils/redux-request";

export const REFRESH_TOKEN = "REFRESH_TOKEN"
export const REFRESH_TOKEN__SUCCESS = "REFRESH_TOKEN__SUCCESS"
export const REFRESH_TOKEN__FAILURE = "REFRESH_TOKEN__FAILURE"

export const getNewToken = (token) => (dispatch) => {
    dispatch({type: REFRESH_TOKEN})

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

    reduxRequest(`${URL}/auth/token`, options, dispatch)
        .then((data) => {
            dispatch({type: REFRESH_TOKEN__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: REFRESH_TOKEN__FAILURE, payload: error.message})
        })
}