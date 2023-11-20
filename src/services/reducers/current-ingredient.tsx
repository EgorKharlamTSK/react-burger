import {HIDE_INFO_CURRENT_INGREDIENT, SHOW_INFO_CURRENT_INGREDIENT} from "../actions/current-ingredient";

const initialState = {
    currentIngredientInfo: [],
    isLoading: false
}

export const currentIngredientInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case SHOW_INFO_CURRENT_INGREDIENT: {
            return {...state, currentIngredientInfo: [...state.currentIngredientInfo, action.payload], isLoading: true}
        }
        case HIDE_INFO_CURRENT_INGREDIENT: {
            return {...state, currentIngredientInfo: [], isLoading: false}
        }
        default: {
            return state
        }
    }
}
