import {createAction} from "@reduxjs/toolkit";
import {IWsFeed} from "../../utils/types";

export const FEED_CONNECT: "FEED_CONNECT" = "FEED_CONNECT"
export const FEED_DISCONNECT: "FEED_DISCONNECT" = "FEED_DISCONNECT"
export const FEED_CONNECT_WS_CONNECTING: "FEED_CONNECT_WS_CONNECTING" = "FEED_CONNECT_WS_CONNECTING"
export const FEED_CONNECT_WS_OPEN: "FEED_CONNECT_WS_OPEN" = "FEED_CONNECT_WS_OPEN"
export const FEED_CONNECT_WS_CLOSE: "FEED_CONNECT_WS_CLOSE" = "FEED_CONNECT_WS_CLOSE"
export const FEED_WS_MESSAGE: "FEED_WS_MESSAGE" = "FEED_WS_MESSAGE"
export const FEED_CONNECT_WS_ERROR: "FEED_CONNECT_WS_ERROR" = "FEED_CONNECT_WS_ERROR"

export const connectFeed = createAction<IWsFeed, typeof FEED_CONNECT>(FEED_CONNECT)
export const disconnectFeed = createAction(FEED_DISCONNECT)
export const ws_connecingtFeed = createAction(FEED_CONNECT_WS_CONNECTING)
export const ws_open_feed = createAction(FEED_CONNECT_WS_OPEN)
export const ws_close_feed = createAction(FEED_CONNECT_WS_CLOSE)
export const ws_message_feed = createAction(FEED_WS_MESSAGE)
export const ws_error_feed = createAction(FEED_CONNECT_WS_ERROR)

export type TWsFeedActions = ReturnType<typeof connectFeed> |
    ReturnType<typeof disconnectFeed> |
    ReturnType<typeof ws_connecingtFeed> |
    ReturnType<typeof ws_open_feed> |
    ReturnType<typeof ws_close_feed> |
    ReturnType<typeof ws_message_feed> |
    ReturnType<typeof ws_error_feed>
