import {URL} from "../../utils/constants";
import {checkResponse} from "../../utils/check-response";
import {reduxRequest} from "../../utils/redux-request";
export const GET_PROFILE_INFO = "GET_PROFILE_INFO"
export const GET_PROFILE_INFO__SUCCESS = "GET_PROFILE_INFO__SUCCESS"
export const GET_PROFILE_INFO__FAILURE = "GET_PROFILE_INFO__FAILURE"
export const EDIT_PROFILE = "EDIT_PROFILE"
export const EDIT_PROFILE__SUCCESS = "EDIT_PROFILE__SUCCESS"
export const EDIT_PROFILE__FAILURE = "EDIT_PROFILE__FAILURE"
export const profile = (token) => (dispatch) => {
    dispatch({type: GET_PROFILE_INFO})

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }

    reduxRequest(`${URL}/auth/user`, options)
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
    const options = {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bodyData),
    }

    reduxRequest(`${URL}/auth/user`, options)
        .then((data) => {
            dispatch({type: EDIT_PROFILE__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: EDIT_PROFILE__FAILURE, payload: error.message})
        })
}