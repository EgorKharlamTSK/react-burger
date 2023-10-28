import {URL} from "../../utils/constants";

export const AUTH_REQUEST = "AUTH_REQUEST"
export const AUTH_REQUEST__SUCCESS = "AUTH_REQUEST__SUCCESS"
export const AUTH_REQUEST__FAILURE = "AUTH_REQUEST__FAILURE"
export const FORGOT_PASSWORD = "FORGOT_PASSWORD"
export const FORGOT_PASSWORD__SUCCESS = "FORGOT_PASSWORD__SUCCESS"
export const FORGOT_PASSWORD__FAILURE = "FORGOT_PASSWORD__FAILURE"


export const getAuth = (email, password) => (dispatch) => {
    dispatch({type: AUTH_REQUEST})

    const data = {
        email: email,
        password: password,
    }

    fetch(`${URL}/auth/login`, {
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
            dispatch({type: AUTH_REQUEST__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: AUTH_REQUEST__FAILURE, payload: error.message})
        })
}

export const forgotPass = (email) => (dispatch) => {
    dispatch({type: FORGOT_PASSWORD})

    const data = {
        email: email,
    }

    fetch(`${URL}/password-reset`, {
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
            dispatch({type: FORGOT_PASSWORD__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: FORGOT_PASSWORD__FAILURE, payload: error.message})
        })
}