import {URL} from "../../utils/constants";
import {checkResponse} from "../../utils/check-response";
import {reduxRequest} from "../../utils/redux-request";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST"
export const GET_ORDER_REQUEST_SUCCESS = "GET_ORDER_REQUEST_SUCCESS"
export const GET_ORDER_REQUEST_FALIURE = "GET_ORDER_REQUEST_FALIURE"
export const getOrders = (allIngredients) => (dispatch) => {
    dispatch({type: GET_ORDER_REQUEST})

    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "ingredients": allIngredients
        })
    }

    reduxRequest(`${URL}/orders`, options)
        .then((data) => {
            dispatch({type: GET_ORDER_REQUEST_SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: GET_ORDER_REQUEST_FALIURE})
        })
}