import {URL} from "../../utils/constants";
import {reduxRequest} from "../../utils/redux-request";
import {AppDispatch, AppThunkAction} from "../../utils/types";

export const REGISTRATION_REQUEST:"REGISTRATION_REQUEST" = "REGISTRATION_REQUEST"
export const REGISTRATION_REQUEST__SUCCESS: "REGISTRATION_REQUEST__SUCCESS" = "REGISTRATION_REQUEST__SUCCESS"
export const REGISTRATION_REQUEST__FAILURE:"REGISTRATION_REQUEST__FAILURE" = "REGISTRATION_REQUEST__FAILURE"

interface IDataUser {
    email: string,
    name: string
}

interface IDataFromReq {
    user: IDataUser
    accessToken: string,
    refreshToken: string,
}

interface IDataFromFailReg {
    errorMessage: string
}

interface IRegReq {
    type: typeof REGISTRATION_REQUEST;
}

interface IRegReq_SUC {
    type: typeof REGISTRATION_REQUEST__SUCCESS;
    payload: IDataFromReq
}

interface IRegReq_FAIL {
    type: typeof REGISTRATION_REQUEST__FAILURE;
    payload: string
}

export type TRegistrationRequest = IRegReq | IRegReq_SUC | IRegReq_FAIL


export const getRegistration = (name: string, email: string, password: string): AppThunkAction => (dispatch: AppDispatch) => {
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