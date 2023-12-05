import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from "./reducers/root-reducer";
import {socketMiddleware} from "./middleware/socket-middleware";

import {
    connect as appWsConnect,
    disconnect as appWsDisconnect,
    wsOpen as appWsOpen,
    wsClose as appWsClose,
    wsMessage as appWsMessage,
    wsError as appWsError
} from "./actions/ws-actions";

const wsActions = {
    wsConnect: appWsConnect,
    wsDisconnect: appWsDisconnect,
    wsOpen: appWsOpen,
    wsClose: appWsClose,
    wsMessage: appWsMessage,
    wsError: appWsError
}

const wsMiddleware = socketMiddleware(wsActions)

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(wsMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})