import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT, GET_INGREDIENTS_COUNTER,
    REORDER_INGREDIENT,
    RESET_INGREDIENT,
    SUM_INGREDIENTS
} from "../actions/burger-constructor";

const initialState = {
    constructorIngredients: [],
    sum: null,
    listOfCounterIngredients: []
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {...state, constructorIngredients: [...state.constructorIngredients, action.payload]}
        }
        case DELETE_INGREDIENT: {
            return {...state, constructorIngredients: state.constructorIngredients.filter(({uniqId}) => uniqId !== action.payload)}
        }
        case SUM_INGREDIENTS: {
            const totalSum = action.payload ? action.payload.reduce((acc, item) => acc + item.price, 0) : 0;
            return {...state, sum: totalSum}
        }
        case REORDER_INGREDIENT: {
            return {...state, constructorIngredients: [...state.constructorIngredients, action.payload]}
        }
        case RESET_INGREDIENT: {
            return {...state, constructorIngredients: [...state.constructorIngredients, action.payload]}
        }
        case GET_INGREDIENTS_COUNTER: {
            return {...state, listOfCounterIngredients: action.payload}
        }
        default: {
            return state
        }
    }
}
