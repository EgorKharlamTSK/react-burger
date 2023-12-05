import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    GET_INGREDIENTS_COUNTER,
    REORDER_INGREDIENT,
    RESET_INGREDIENT,
    SUM_INGREDIENTS, TBurgerActions,
} from "../actions/burger-constructor";

import { IBurgerItemData } from "../../utils/types";
import update from "immutability-helper";

interface IIngredCount {
    [x: string]: number
}

type state = {
    constructorIngredients: (IBurgerItemData & { uniqId: string })[];
    sum: number|null;
    listOfCounterIngredients: IIngredCount;
}

const initialState: state = {
    constructorIngredients: [],
    sum: null,
    listOfCounterIngredients: {}
}

export const constructorReducer = (state: state = initialState, action: TBurgerActions): state => {
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
            const newIngredients = update(state.constructorIngredients, {
                $splice: [
                    [action.payload.from, 1],
                    [action.payload.to, 0, state.constructorIngredients[action.payload.from]]
                ],
            });
            return {...state, constructorIngredients: newIngredients}
        }
        case RESET_INGREDIENT: {
            return initialState
        }
        case GET_INGREDIENTS_COUNTER: {
            return {...state, listOfCounterIngredients: action.payload}
        }
        default: {
            return state
        }
    }
}
