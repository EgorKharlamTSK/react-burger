import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_REQUEST_FALIURE,
    GET_INGREDIENTS_REQUEST_SUCCESS
} from "../actions/all-ingredients";

const initialState = {
    ingredients: [],
    isLoading: false,
    error: null,
}
export const allIngredients = (state = initialState, action: { type: any; payload: any; }) => {
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