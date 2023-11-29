import {URL} from "../../utils/constants";
import {reduxRequest} from "../../utils/redux-request";
import {Dispatch} from "redux";
import {AppDispatch, AppThunkAction} from "../../utils/types";

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
// export const profile = (token: string): any => (dispatch: TDispatch): any => {
//     dispatch({type: GET_PROFILE_INFO})
//
//     const options = {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'authorization': token
//         }
//     }
//
//     reduxRequest(`${URL}/auth/user`, options, dispatch)
//         .then((data) => {
//             dispatch({type: GET_PROFILE_INFO__SUCCESS, payload: data})
//         })
//         .catch((error) => {
//             dispatch({type: GET_PROFILE_INFO__FAILURE, payload: error.message})
//         })
// }

// export const editProfile = (token: string, data: {email?: string, login?: string, password?: string}): any => (dispatch: TDispatch): any => {
//     dispatch({type: EDIT_PROFILE})
//
//     const bodyData = data
//     const options = {
//         method: 'PATCH',
//         headers: {
//             authorization: token,
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(bodyData),
//     }
//
//     reduxRequest(`${URL}/auth/user`, options, dispatch)
//         .then((data) => {
//             dispatch({type: EDIT_PROFILE__SUCCESS, payload: data})
//         })
//         .catch((error) => {
//             dispatch({type: EDIT_PROFILE__FAILURE, payload: error.message})
//         })
// }
//
// export const checkAuth = (): any => (dispatch: TDispatch): any => {
//     dispatch({type: CHECK_AUTH})
//
//     const accessToken = localStorage.getItem('accessToken')
//
//     if (accessToken) {
//         dispatch({type: CHECK_AUTH__SUCCESS, payload: true})
//     } else {
//         dispatch({type: CHECK_AUTH__FAILURE, payload: false})
//     }
// }
interface IProfileData {
    email?: string;
    login?: string;
    password?: string;
}
interface IGetProfileInfoAction {
    type: typeof GET_PROFILE_INFO;
}

interface IGetProfileInfoSuccessAction {
    type: typeof GET_PROFILE_INFO__SUCCESS;
    payload: { email: string, name: string };
}

interface IGetProfileInfoFailedAction {
    type: typeof GET_PROFILE_INFO__FAILURE;
    payload: string;
}

interface ICheckAuthAction {
    type: typeof CHECK_AUTH;
}

interface ICheckAuthSuccesstAction {
    type: typeof CHECK_AUTH__SUCCESS;
    payload: boolean;
}

interface ICheckAuthFailureAction {
    type: typeof CHECK_AUTH__FAILURE;
    payload: boolean;
}

interface IEditProfileAction {
    type: typeof EDIT_PROFILE;
}

interface IEditProfileSuccessAction {
    type: typeof EDIT_PROFILE__SUCCESS;
    payload: { email: string, name: string };
}

interface IEditProfileFailedAction {
    type: typeof EDIT_PROFILE__FAILURE;
    payload: string;
}

export interface IResetProfile {
    type: typeof RESET_PROFILE;
}

export type TProfileActionTypes = IGetProfileInfoAction | IGetProfileInfoSuccessAction | IGetProfileInfoFailedAction | ICheckAuthAction | ICheckAuthSuccesstAction | ICheckAuthFailureAction | IEditProfileAction | IEditProfileSuccessAction | IEditProfileFailedAction | IResetProfile;

export const profile = (token: string): AppThunkAction<Promise<unknown>> => (dispatch) => {
    dispatch({type: GET_PROFILE_INFO})
    dispatch({type: CHECK_AUTH} )

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    };

    return reduxRequest(`${URL}/auth/user`, options, dispatch)
        .then((data) => {
            const userData = {
                email: data.email,
                name: data.name,
            }
            dispatch({type: GET_PROFILE_INFO__SUCCESS, payload: userData})
        })
        .catch((error) => {
            dispatch({type: GET_PROFILE_INFO__FAILURE, payload: error.message})
        })
}

export const editProfile = (token: string, data: IProfileData): AppThunkAction => (dispatch: AppDispatch) => {
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

export const checkAuth = (): (dispatch: any) => void => (dispatch) => {
    dispatch({type: CHECK_AUTH} )

    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        dispatch({type: CHECK_AUTH__SUCCESS, payload: true})
    } else {
        dispatch({type: CHECK_AUTH__FAILURE, payload: false})
    }
}