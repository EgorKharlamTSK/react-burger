import { Middleware } from 'redux';
import {TRootState} from "../../utils/types";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export type TwsActionsTypes = {
    wsConnect: ActionCreatorWithPayload<any>
    wsDisconnect: ActionCreatorWithoutPayload
    wsOpen: ActionCreatorWithoutPayload
    wsClose: ActionCreatorWithoutPayload
    wsError: ActionCreatorWithPayload<string>
    wsMessage: ActionCreatorWithPayload<any>
};

export const socketMiddleware = (wsActions: TwsActionsTypes): Middleware<{}, TRootState> => {
    return ((store) => {
        let socket: WebSocket | null = null

        return next => (action) => {
            const {dispatch} = store
            const {
                wsConnect,
                wsDisconnect,
                wsMessage,
                wsOpen,
                wsError,
                wsClose
            } = wsActions

            if (wsConnect.match(action)) {
                const url = action.payload
                socket = new WebSocket(url)
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsOpen())
                }

                socket.onerror = (event) => {
                    dispatch(wsError(event.type.toString()))
                }

                socket.onmessage = event => {
                    const {data} = event
                    const parsedData = JSON.parse(data)

                    dispatch(wsMessage(parsedData))
                }

                socket.onclose = () => {
                    dispatch(wsClose())
                }

            }

            if (wsDisconnect.match(action)) {
                dispatch(wsClose())
            }

            next(action)
        }
    })
}