import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from "./reducers/root-reducer";

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
    devTools: process.env.NODE_ENV !== 'production',
})