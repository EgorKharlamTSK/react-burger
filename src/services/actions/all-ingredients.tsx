import {URL} from "../../utils/constants";
import {reduxRequest} from "../../utils/redux-request";
import {Dispatch} from "react";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST"
export const GET_INGREDIENTS_REQUEST_SUCCESS = "GET_INGREDIENTS_REQUEST_SUCCESS"
export const GET_INGREDIENTS_REQUEST_FALIURE = "GET_INGREDIENTS_REQUEST_FALIURE"

export const getAllIngredients = () => (dispatch:  Dispatch<any>): any => {
    dispatch({type: GET_INGREDIENTS_REQUEST})
    reduxRequest(`${URL}/ingredients`)
        .then((data) => {
            dispatch({type: GET_INGREDIENTS_REQUEST_SUCCESS, payload: data.data})
        })
        .catch((error) => {
            dispatch({type: GET_INGREDIENTS_REQUEST_FALIURE})
        })
}