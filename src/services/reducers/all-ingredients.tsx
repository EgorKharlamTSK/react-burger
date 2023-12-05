import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_REQUEST_FALIURE,
    GET_INGREDIENTS_REQUEST_SUCCESS, TGetIngredient
} from "../actions/all-ingredients";
import {IBurgerItemData} from "../../utils/types";

interface IInitialStateAllIngred {
    ingredients: IBurgerItemData[],
    isLoading: boolean,
    error: string,
}

const initialState: IInitialStateAllIngred = {
    ingredients: [],
    isLoading: false,
    error: '',
}
export const allIngredients = (state = initialState, action: TGetIngredient): IInitialStateAllIngred=> {
    switch (action.type){
        case GET_INGREDIENTS_REQUEST: {
            return {...state,  isLoading: true}
        }
        case GET_INGREDIENTS_REQUEST_SUCCESS: {
            return {...state, ingredients: action.payload, isLoading: false}
        }
        case GET_INGREDIENTS_REQUEST_FALIURE: {
            return {...state, ingredients: [], isLoading: false, error: "Ошибка загрузки данных"}
        }
        default:
            return state;
    }
}