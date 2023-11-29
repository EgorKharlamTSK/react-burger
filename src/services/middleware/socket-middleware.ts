import {Middleware} from "redux";
import {TRootState} from "../../utils/types";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export type TWsActions = {
    wsConnect: ActionCreatorWithPayload<any>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<any>,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>
}

export const socketMiddleware = (wsActions: TWsActions): Middleware<{},TRootState> => {
    return ((store) => {
        let socket: WebSocket | null = null;
        let isConnected = false
        let reconnectTimer = 0
        let url = ''

        return next => (action) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { wsConnect, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            if (wsConnect.match(action)) {
                const url = action.payload
                socket = new WebSocket(url);
            }
            if (socket) {
                socket.onopen = () => {
                    dispatch(onOpen());
                    isConnected = true
                };

                socket.onerror = (event) => {
                    dispatch(onError(event.type))
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    dispatch(onMessage(parsedData));
                };

                socket.onclose = event => {
                    if (event.code !== 1000) {
                        dispatch(onError(event.code.toString()))
                    }
                    dispatch(onClose());

                    if (isConnected) {

                    }
                };

                if (wsSendMessage?.match(action)) {
                    const payload = action.payload;
                    const message = { ...(payload)};
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    });
};