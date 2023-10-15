import { combineReducers } from 'redux';
import {constructorReducer} from "./burger-constructor";
import {allIngredients} from "./all-ingredients";
import {currentIngredientInfoReducer} from "./current-ingredient";
import {orderInfoReducer} from "./order";

export const rootReducer = combineReducers({
    allIngredients: allIngredients,
    constructorReducer: constructorReducer,
    currentIngredientInfo: currentIngredientInfoReducer,
    orderInfo: orderInfoReducer
})