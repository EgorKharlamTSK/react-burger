import {URL} from "../../utils/constants";
import {reduxRequest} from "../../utils/redux-request";
import {Dispatch} from "react";
import {AppDispatch, AppThunkAction, IBurgerIngredientsItemType} from "../../utils/types";
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = "GET_INGREDIENTS_REQUEST"
export const GET_INGREDIENTS_REQUEST_SUCCESS: 'GET_INGREDIENTS_REQUEST_SUCCESS' = "GET_INGREDIENTS_REQUEST_SUCCESS"
export const GET_INGREDIENTS_REQUEST_FALIURE: 'GET_INGREDIENTS_REQUEST_FALIURE' = "GET_INGREDIENTS_REQUEST_FALIURE"

export interface IGetIngredientsReq {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsReqSuc {
    readonly type: typeof GET_INGREDIENTS_REQUEST_SUCCESS;
    readonly payload: IBurgerIngredientsItemType
}

export interface IGetIngredientsReqFail {
    readonly type: typeof GET_INGREDIENTS_REQUEST_FALIURE;
}

export type TGetIngredient = | IGetIngredientsReq | IGetIngredientsReqSuc | IGetIngredientsReqFail


export const getAllIngredients = (): AppThunkAction<Promise<unknown>> => (dispatch) => {
    dispatch({type: GET_INGREDIENTS_REQUEST})
    return reduxRequest(`${URL}/ingredients`)
        .then((data) => {
            dispatch({type: GET_INGREDIENTS_REQUEST_SUCCESS, payload: data.data})
        })
        .catch((error) => {
            dispatch({type: GET_INGREDIENTS_REQUEST_FALIURE})
        })
}