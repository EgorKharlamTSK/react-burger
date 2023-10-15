import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from "./reducers/root-reducer";
import thunk from "redux-thunk";

const initialState = {
    allIngredients: [],
    burgerConstructor: [],
    // currentIngredient: [],
    // order: []
}

export const store = configureStore({
    reducer: rootReducer,
    // preloadedState: initialState,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
})