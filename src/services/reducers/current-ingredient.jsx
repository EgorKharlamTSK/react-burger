import {HIDE_INFO_CURRENT_INGREDIENT, SHOW_INFO_CURRENT_INGREDIENT} from "../actions/current-ingredient";

const initialState = {
    currentIngredientInfo: []
}

export const currentIngredientInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_INFO_CURRENT_INGREDIENT: {
            return {...state, currentIngredientInfo: [...state.currentIngredientInfo, action.payload]}
        }
        case HIDE_INFO_CURRENT_INGREDIENT: {
            return {...state, currentIngredientInfo: []}
        }
        default: {
            return state
        }
    }
}
