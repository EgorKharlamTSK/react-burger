import {URL} from "../../utils/constants";
import {reduxRequest} from "../../utils/redux-request";
import {AppDispatch, AppThunkAction, IRefreshData, TDispatch} from "../../utils/types";
import {RESET_PASSWORD_REQUEST} from "./reset-password";

export const REFRESH_TOKEN = "REFRESH_TOKEN"
export const REFRESH_TOKEN__SUCCESS = "REFRESH_TOKEN__SUCCESS"
export const REFRESH_TOKEN__FAILURE = "REFRESH_TOKEN__FAILURE"

interface IDataForRefreshTokSuc {
    accessToken: string,
    refreshToken: string
}

interface IDataForRefreshTokFail {
    error: string
}

interface IRefreshTok {
    type: typeof REFRESH_TOKEN;
}
interface IRefreshTokSuc {
    type: typeof REFRESH_TOKEN__SUCCESS;
    payload: IDataForRefreshTokSuc

}
interface IRefreshTokFail {
    type: typeof REFRESH_TOKEN__FAILURE
    payload: IDataForRefreshTokFail
}

export type TRefreshTokeAction = IRefreshTok | IRefreshTokSuc | IRefreshTokFail

export const getNewToken = (token:string): AppThunkAction => async (dispatch: AppDispatch): Promise<{accessToken: string, refreshToken: string}> => {
    dispatch({type: REFRESH_TOKEN})

    const data = {
        token: token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    }

    try {
        const data_1 = await reduxRequest(`${URL}/auth/token`, options, dispatch);
        dispatch({type: REFRESH_TOKEN__SUCCESS, payload: data_1});
        return data_1;
    } catch (error: any) {
        dispatch({type: REFRESH_TOKEN__FAILURE, payload: error.message});
        throw error;
    }
}