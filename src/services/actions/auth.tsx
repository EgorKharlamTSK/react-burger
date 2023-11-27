import {URL} from "../../utils/constants";
import {reduxRequest} from "../../utils/redux-request";
import {AppDispatch, AppThunkAction, TDispatch} from "../../utils/types";

export const AUTH_REQUEST:'AUTH_REQUEST' = "AUTH_REQUEST"
export const AUTH_REQUEST__SUCCESS: 'AUTH_REQUEST__SUCCESS' = "AUTH_REQUEST__SUCCESS"
export const AUTH_REQUEST__FAILURE:'AUTH_REQUEST__FAILURE' = "AUTH_REQUEST__FAILURE"
export const RESET_AUTH: 'RESET_AUTH' = "RESET_AUTH"
export const FORGOT_PASSWORD: 'FORGOT_PASSWORD' = "FORGOT_PASSWORD"
export const FORGOT_PASSWORD__SUCCESS: 'FORGOT_PASSWORD__SUCCESS' = "FORGOT_PASSWORD__SUCCESS"
export const FORGOT_PASSWORD__FAILURE: 'FORGOT_PASSWORD__FAILURE' = "FORGOT_PASSWORD__FAILURE"

interface AuthData {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string,
        name: string,
    };
}

interface ForgotData {
    success: boolean;
    message: string;
}

interface IAuthReq {
    readonly type: typeof AUTH_REQUEST;
}

interface IAuthReqSuc {
    readonly type: typeof AUTH_REQUEST__SUCCESS;
    readonly payload: AuthData;
}

interface IAuthReqFail {
    readonly type: typeof AUTH_REQUEST__FAILURE;
    readonly payload: string;
}

export interface IAuthReset {
    readonly type: typeof RESET_AUTH;
}

interface IAuthForPas {
    readonly type: typeof FORGOT_PASSWORD;
}

interface IAuthForPasSuc {
    readonly type: typeof FORGOT_PASSWORD__SUCCESS;
    readonly payload: ForgotData;
}

interface IAuthForPasFail {
    readonly type: typeof FORGOT_PASSWORD__FAILURE;
    readonly payload: ForgotData;

}

export type TAuth = | IAuthReq | IAuthReqSuc | IAuthReqFail | IAuthReset | IAuthForPas | IAuthForPasSuc | IAuthForPasFail

export const getAuth = (email: string, password: string): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({type: AUTH_REQUEST})

    const data = {
        email: email,
        password: password,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    }

    reduxRequest(`${URL}/auth/login`, options, dispatch)
        .then((data) => {
            dispatch({type: AUTH_REQUEST__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: AUTH_REQUEST__FAILURE, payload: error.message})
        })
}

export const forgotPass = (email: string): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({type: FORGOT_PASSWORD})

    const data = {
        email: email,
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    }

    reduxRequest(`${URL}/password-reset`, options, dispatch)
        .then((data) => {
            dispatch({type: FORGOT_PASSWORD__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: FORGOT_PASSWORD__FAILURE, payload: error.message})
        })
}