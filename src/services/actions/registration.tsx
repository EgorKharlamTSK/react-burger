import {URL} from "../../utils/constants";
import {checkResponse} from "../../utils/check-response";
import {reduxRequest} from "../../utils/redux-request";
import {TDispatch} from "../../utils/types";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST"
export const REGISTRATION_REQUEST__SUCCESS = "REGISTRATION_REQUEST__SUCCESS"
export const REGISTRATION_REQUEST__FAILURE = "REGISTRATION_REQUEST__FAILURE"

export const getRegistration = (name: string, email: string, password: string): any => (dispatch: TDispatch): any => {
    dispatch({type: REGISTRATION_REQUEST})

    const data = {
        email: email,
        password: password,
        name: name
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    }

    reduxRequest(`${URL}/auth/register`, options, dispatch)
        .then((data) => {
            dispatch({type: REGISTRATION_REQUEST__SUCCESS, payload: data.data})
        })
        .catch((error) => {
            dispatch({type: REGISTRATION_REQUEST__FAILURE, payload: error.message})
        })
}