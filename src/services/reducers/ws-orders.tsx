import {IWsFeed, WebsocketStatus} from "../../utils/types";
import {ws_close_feed, ws_connecingtFeed, ws_error_feed, ws_message_feed, ws_open_feed} from "../actions/ws-orders";
import {createReducer} from "@reduxjs/toolkit";

type TWsFeed = {
    wsConnected: boolean
    status: WebsocketStatus
    feeds: IWsFeed[]
    error?: string
}

const initialState: TWsFeed = {
    wsConnected: false,
    status: WebsocketStatus.OFFLINE,
    feeds: [],
    error: ''
}

export const wsFeedsReducer = createReducer(initialState, builder => {
    builder
        .addCase(ws_connecingtFeed, (state) => {
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(ws_open_feed, (state) => {
            state.status = WebsocketStatus.ONLINE
            state.error = ''
        })
        .addCase(ws_close_feed, (state) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(ws_error_feed, (state, action) => {
            state.error = action.payload
        })
        .addCase(ws_message_feed, (state, action) => {
            if (action.payload) {
                state.feeds = [...state.feeds, action.payload];
            }
        })
})