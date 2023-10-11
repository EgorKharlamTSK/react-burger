import {ADD_INGREDIENT, DELETE_INGREDIENT, REORDER_INGREDIENT, RESET_INGREDIENT} from "../actions/burger-constructor";

const initialState = {
    constructorIngredients: []
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {...state, constructorIngredients: [...state.constructorIngredients, action.payload]}
        }
        case DELETE_INGREDIENT: {
            return {...state, constructorIngredients: state.constructorIngredients.filter(({uniqId}) => uniqId !== action.payload)}
        }
        case REORDER_INGREDIENT: {
            return {...state, constructorIngredients: [...state.constructorIngredients, action.payload]}
        }
        case RESET_INGREDIENT: {
            return {...state, constructorIngredients: [...state.constructorIngredients, action.payload]}
        }
        default: {
            return state
        }
    }
}
