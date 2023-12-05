import {URL} from "../../utils/constants";
import {reduxRequest} from "../../utils/redux-request";
import {AppDispatch, AppThunkAction} from "../../utils/types";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST"
export const RESET_PASSWORD_REQUEST__SUCCESS = "RESET_PASSWORD_REQUEST__SUCCESS"
export const RESET_PASSWORD_REQUEST__FAILURE = "RESET_PASSWORD_REQUEST__FAILURE"

interface IDataForSuc {
    message: string
}

interface IResetPass {
    type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPassSuc {
    type: typeof RESET_PASSWORD_REQUEST__SUCCESS
    payload: IDataForSuc
}
interface IResetPassFail {
    type: typeof RESET_PASSWORD_REQUEST__FAILURE;
}

export type TResetPassword = IResetPass | IResetPassSuc | IResetPassFail

export const resetPassword = (data: { password: string; token: string; }): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({type: RESET_PASSWORD_REQUEST})

    const bodyData = data
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    }

    reduxRequest(`${URL}/password-reset/reset`, options, dispatch)
        .then((data) => {
            dispatch({type: RESET_PASSWORD_REQUEST__SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: RESET_PASSWORD_REQUEST__FAILURE, payload: error.message})
        })
}