import {
    TCurrentIngredientAction,
    HIDE_INFO_CURRENT_INGREDIENT,
    SHOW_INFO_CURRENT_INGREDIENT
} from "../actions/current-ingredient";
import {IBurgerItemData} from "../../utils/types";

type CurrentIngredientState = {
    currentIngredientInfo: IBurgerItemData | undefined;
    isLoading: boolean;
};

const initialState: CurrentIngredientState = { currentIngredientInfo: undefined, isLoading: false };

export const currentIngredientInfoReducer = (state: CurrentIngredientState = initialState, action: TCurrentIngredientAction): CurrentIngredientState => {
    switch (action.type) {
        case SHOW_INFO_CURRENT_INGREDIENT: {
            return { ...state, currentIngredientInfo: action.payload, isLoading: true };
        }
        case HIDE_INFO_CURRENT_INGREDIENT: {
            return { ...state, currentIngredientInfo: undefined, isLoading: false };
        }
        default: {
            return state;
        }
    }
};