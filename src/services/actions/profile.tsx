import {URL} from "../../utils/constants";
import {checkResponse} from "../../utils/check-response";
import {reduxRequest} from "../../utils/redux-request";
import {TDispatch} from "../../utils/types";
export const GET_PROFILE_INFO = "GET_PROFILE_INFO"
export const GET_PROFILE_INFO__SUCCESS = "GET_PROFILE_INFO__SUCCESS"
export const GET_PROFILE_INFO__FAILURE = "GET_PROFILE_INFO__FAILURE"
export const RESET_PROFILE = "RESET_PROFILE"
export const CHECK_AUTH = "CHECK_AUTH"
export const CHECK_AUTH__SUCCESS = "CHECK_AUTH__SUCCESS"
export const CHECK_AUTH__FAILURE = "CHECK_AUTH__FAILURE"
export const EDIT_PROFILE = "EDIT_PROFILE"
export const EDIT_PROFILE__SUCCESS = "EDIT_PROFILE__SUCCESS"
export const EDIT_PROFILE__FAILURE = "EDIT_PROFILE__FAILURE"
export const profile = (token: string): any => (dispatch: TDispatch): any => {
    dispatch({type: GET_PROFILE_INFO})

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }

    reduxRequest(`${URL}/auth/user`, options, dispatch)
        .then((data) => {
            dispatch({type: GET_PROFILE_INFO__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: GET_PROFILE_INFO__FAILURE, payload: error.message})
        })
}

export const editProfile = (token: string, data: {email?: string, login?: string, password?: string}): any => (dispatch: TDispatch): any => {
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

    reduxRequest(`${URL}/auth/user`, options, dispatch)
        .then((data) => {
            dispatch({type: EDIT_PROFILE__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: EDIT_PROFILE__FAILURE, payload: error.message})
        })
}

export const checkAuth = (): any => (dispatch: TDispatch): any => {
    dispatch({type: CHECK_AUTH})

    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
        dispatch({type: CHECK_AUTH__SUCCESS, payload: true})
    } else {
        dispatch({type: CHECK_AUTH__FAILURE, payload: false})
    }
}