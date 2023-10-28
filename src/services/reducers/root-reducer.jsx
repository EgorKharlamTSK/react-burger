import { combineReducers } from 'redux';
import {constructorReducer} from "./burger-constructor";
import {allIngredients} from "./all-ingredients";
import {currentIngredientInfoReducer} from "./current-ingredient";
import {orderInfoReducer} from "./order";
import {registrationReducer} from "./registration";
import {authReducer} from "./auth";
import {updateTokenReducer} from "./update-token";
import {quitReducer} from "./quit-user";
import {profileInfoReducer} from "./profile";

export const rootReducer = combineReducers({
    allIngredients: allIngredients,
    constructorReducer: constructorReducer,
    currentIngredientInfo: currentIngredientInfoReducer,
    orderInfo: orderInfoReducer,
    registration: registrationReducer,
    auth: authReducer,
    updateToken: updateTokenReducer,
    quitUser: quitReducer,
    profileData: profileInfoReducer
})