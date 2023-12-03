import {AppDispatch, AppThunkAction, ISpecs, IWsFeedsItem} from "../../utils/types";
import {reduxRequest} from "../../utils/redux-request";
import {ORDER_URL, SPEC_ORDER_URL} from "../../utils/constants";

export const SPEC_ORDER_REQUEST =  "SPEC_ORDER_REQUEST"
export const SPEC_ORDER_SUCCESS =  "SPEC_ORDER_SUCCESS"
export const SPEC_ORDER_FAILURE =  "SPEC_ORDER_FAILURE"

interface ISpecOrdReq {
    type: typeof SPEC_ORDER_REQUEST
}

interface ISpecOrdSuc {
    type: typeof SPEC_ORDER_SUCCESS
    payload: ISpecs
}

interface ISpecOrdFail {
    type: typeof SPEC_ORDER_FAILURE
    payload: string
}

export type TSpecOrderRequest = ISpecOrdReq | ISpecOrdSuc | ISpecOrdFail

export const fintSpecOrder = (number: string | undefined):AppThunkAction<unknown> => (dispatch: AppDispatch) => {
    dispatch({type: SPEC_ORDER_REQUEST})

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    reduxRequest(`${SPEC_ORDER_URL}/${number}`, options,dispatch)
        .then((data) => {
            dispatch({type: SPEC_ORDER_SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: SPEC_ORDER_FAILURE, payload: error.message})
        })
}