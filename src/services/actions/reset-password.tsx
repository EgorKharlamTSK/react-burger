import {URL} from "../../utils/constants";
import {checkResponse} from "../../utils/check-response";
import {reduxRequest} from "../../utils/redux-request";
import {TDispatch} from "../../utils/types";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST"
export const RESET_PASSWORD_REQUEST__SUCCESS = "RESET_PASSWORD_REQUEST__SUCCESS"
export const RESET_PASSWORD_REQUEST__FAILURE = "RESET_PASSWORD_REQUEST__FAILURE"

export const resetPassword = (data: any): any => (dispatch: TDispatch): any => {
    dispatch({type: RESET_PASSWORD_REQUEST})

    const bodyData = data
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    }

    reduxRequest(`${URL}/password-reset/reset`, options, dispatch)
        .then((data) => {
            dispatch({type: RESET_PASSWORD_REQUEST__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: RESET_PASSWORD_REQUEST__FAILURE, payload: error.message})
        })
}