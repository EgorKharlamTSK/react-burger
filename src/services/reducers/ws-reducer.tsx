import {IWsFeed, WebsocketStatus} from "../../utils/types";
import {createReducer} from "@reduxjs/toolkit";
import {connect, wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "../actions/ws-actions";

type TWsFeed = {
    wsConnected: boolean
    status: WebsocketStatus
    orders: IWsFeed | null
    error?: string
}

const initialState: TWsFeed = {
    wsConnected: false,
    status: WebsocketStatus.OFFLINE,
    orders: null,
    error: ''
}

export const wsFeedsReducer = createReducer(initialState, builder => {
    builder
        .addCase(wsConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE
            state.error = ''
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsError, (state, action) => {
            state.error = action.payload
        })
        .addCase(wsMessage, (state, action) => {
            if (action.payload) {
                return {...state, orders: action.payload};
            }
        })
})