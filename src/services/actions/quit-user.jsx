import {URL} from "../../utils/constants";

export const QUIT_REQUEST = "QUIT_REQUEST"
export const QUIT__SUCCESS = "QUIT__SUCCESS"
export const QUIT__FAILURE = "QUIT__FAILURE"

export const quitUser = (token) => (dispatch) => {
    dispatch({type: QUIT_REQUEST})

    const data = {
        token: token
    }

    fetch(`${URL}/auth/logout`, {
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
            dispatch({type: QUIT__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: QUIT__FAILURE, payload: error.message})
        })
}