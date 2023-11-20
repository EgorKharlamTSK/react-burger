import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from "./reducers/root-reducer";
import thunk from "redux-thunk";

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
})