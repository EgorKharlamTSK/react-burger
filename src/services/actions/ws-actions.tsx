import {IWsFeed} from "../../utils/types";
import {createAction} from "@reduxjs/toolkit";

export const WS_CONNECT = 'WS_CONNECT';

export const connect = createAction<string, typeof WS_CONNECT>(WS_CONNECT)
export const disconnect = createAction("WS_DISCONNECT")
export const wsConnecting = createAction("WS_CONNECTING")
export const wsOpen = createAction("WS_OPEN")
export const wsClose = createAction("WS_CLOSE")
export const wsMessage = createAction<IWsFeed,"WS_MESSAGE">("WS_MESSAGE")
export const wsError = createAction<string, "WS_ERROR">("WS_ERROR")

export type TWSActions = ReturnType<typeof connect> |
    ReturnType<typeof disconnect> |
    ReturnType<typeof wsConnecting> |
    ReturnType<typeof wsOpen> |
    ReturnType<typeof wsClose> |
    ReturnType<typeof wsMessage> |
    ReturnType<typeof wsError>