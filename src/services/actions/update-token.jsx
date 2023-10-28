import {URL} from "../../utils/constants";

export const REFRESH_TOKEN = "REFRESH_TOKEN"
export const REFRESH_TOKEN__SUCCESS = "REFRESH_TOKEN__SUCCESS"
export const REFRESH_TOKEN__FAILURE = "REFRESH_TOKEN__FAILURE"

export const getNewToken = (token) => (dispatch) => {
    dispatch({type: REFRESH_TOKEN})

    const data = {
        token: token
    }

    fetch(`${URL}/auth/token`, {
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
            dispatch({type: REFRESH_TOKEN__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: REFRESH_TOKEN__FAILURE, payload: error.message})
        })
}