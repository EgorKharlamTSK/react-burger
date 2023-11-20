import {URL} from "../../utils/constants";
import {reduxRequest} from "../../utils/redux-request";
import {IRefreshData, TDispatch} from "../../utils/types";

export const REFRESH_TOKEN = "REFRESH_TOKEN"
export const REFRESH_TOKEN__SUCCESS = "REFRESH_TOKEN__SUCCESS"
export const REFRESH_TOKEN__FAILURE = "REFRESH_TOKEN__FAILURE"

export const getNewToken = (token:string): any => async (dispatch: TDispatch): Promise<IRefreshData> => {
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