import {URL} from "../../utils/constants";
import {reduxRequest} from "../../utils/redux-request";
import {AppDispatch, TDispatch} from "../../utils/types";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST"
export const GET_ORDER_REQUEST_SUCCESS = "GET_ORDER_REQUEST_SUCCESS"
export const GET_ORDER_REQUEST_FALIURE = "GET_ORDER_REQUEST_FALIURE"


interface IGetOrderRequestAction {
    type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderRequestSuccessAction {
    type: typeof GET_ORDER_REQUEST_SUCCESS;
    payload: any;
}

interface IGetOrderRequestFailureAction {
    type: typeof GET_ORDER_REQUEST_FALIURE;
}

export type TOrderInfoActions = IGetOrderRequestAction | IGetOrderRequestSuccessAction | IGetOrderRequestFailureAction;

export const getOrders = (allIngredients: any[]) => (dispatch: AppDispatch) => {
    dispatch<IGetOrderRequestAction>({ type: GET_ORDER_REQUEST });
    const accessToken = localStorage.getItem("accessToken")

    const options = {
        headers: { 'Content-Type': 'application/json',
            "authorization": `Bearer ${accessToken}`
        },
        method: 'POST',
        body: JSON.stringify({ "ingredients": allIngredients })
    }

    reduxRequest(`${URL}/orders`, options, dispatch)
        .then((data) => {
            dispatch<IGetOrderRequestSuccessAction>({ type: GET_ORDER_REQUEST_SUCCESS, payload: data })
        })
        .catch((error) => {
            dispatch<IGetOrderRequestFailureAction>({ type: GET_ORDER_REQUEST_FALIURE })
        })
}