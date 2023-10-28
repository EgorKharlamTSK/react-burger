import {URL} from "../../utils/constants";
export const GET_PROFILE_INFO = "GET_PROFILE_INFO"
export const GET_PROFILE_INFO__SUCCESS = "GET_PROFILE_INFO__SUCCESS"
export const GET_PROFILE_INFO__FAILURE = "GET_PROFILE_INFO__FAILURE"
export const EDIT_PROFILE = "EDIT_PROFILE"
export const EDIT_PROFILE__SUCCESS = "EDIT_PROFILE__SUCCESS"
export const EDIT_PROFILE__FAILURE = "EDIT_PROFILE__FAILURE"
export const profile = (token) => (dispatch) => {
    dispatch({type: GET_PROFILE_INFO})

    fetch(`${URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
        .then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error('Error on fetch')
            }
        })
        .then((data) => {
            dispatch({type: GET_PROFILE_INFO__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: GET_PROFILE_INFO__FAILURE, payload: error.message})
        })
}

export const editProfile = (token, data) => (dispatch) => {
    dispatch({type: EDIT_PROFILE})

    const bodyData = data

    fetch(`${URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json;charset=utf-8'
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
            dispatch({type: EDIT_PROFILE__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: EDIT_PROFILE__FAILURE, payload: error.message})
        })
}