import {URL} from "../../utils/constants";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST"
export const REGISTRATION_REQUEST__SUCCESS = "REGISTRATION_REQUEST__SUCCESS"
export const REGISTRATION_REQUEST__FAILURE = "REGISTRATION_REQUEST__FAILURE"

export const getRegistration = (name, email, password) => (dispatch) => {
    dispatch({type: REGISTRATION_REQUEST})

    const data = {
        email: email,
        password: password,
        name: name
    }

    fetch(`${URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error('Error on fetch')
            }
        })
        .then((data) => {
            dispatch({type: REGISTRATION_REQUEST__SUCCESS, payload: data.data})
        })
        .catch((error) => {
            dispatch({type: REGISTRATION_REQUEST__FAILURE, payload: error.message})
        })
}