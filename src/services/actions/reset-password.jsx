import {URL} from "../../utils/constants";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST"
export const RESET_PASSWORD_REQUEST__SUCCESS = "RESET_PASSWORD_REQUEST__SUCCESS"
export const RESET_PASSWORD_REQUEST__FAILURE = "RESET_PASSWORD_REQUEST__FAILURE"

export const resetPassword = (data) => (dispatch) => {
    dispatch({type: RESET_PASSWORD_REQUEST})

    const bodyData = data

    fetch(`${URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    })
        .then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error('Error on fetch')
            }
        })
        .then((data) => {
            dispatch({type: RESET_PASSWORD_REQUEST__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: RESET_PASSWORD_REQUEST__FAILURE, payload: error.message})
        })
}