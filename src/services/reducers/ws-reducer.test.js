import {WebsocketStatus} from "../../utils/types";
import {wsFeedsReducer} from "./ws-reducer";
import {connect, wsClose, wsOpen} from "../actions/ws-actions";

describe("wsFeedsReducer reducer", () => {
    const initialState = {
        wsConnected: false,
        status: WebsocketStatus.OFFLINE,
        orders: null,
        error: ''
    }

    const itemIngr = {
        ingredients: [
            "1234qwerty1",
            "1234qwerty2",
            "1234qwerty3"
        ],
        _id: "qwertyuio123456",
        status: "done",
        number: "1234qwerty",
        createdAt: "2023-12-01",
        updatedAt: "2024-01-01",
        name: "321cvbn",
        owner: "123qwerty",
        __v: 2
    }

    const item = {
        success: true,
        orders: itemIngr,
        total: 2,
        totalToday: 3
    }

    it("should return initial state", () => {
        return expect(wsFeedsReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle connect", () => {
        const action = connect
        const expectedState = {...initialState}
        return expect(wsFeedsReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle wsOpen", () => {
        const action = wsOpen
        const expectedState = {...initialState, status: WebsocketStatus.ONLINE, error: ""}
        return expect(wsFeedsReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle wsClose", () => {
        const action = wsClose
        const expectedState = {...initialState, status: WebsocketStatus.OFFLINE}
        return expect(wsFeedsReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle wsError", () => {
        const action = {type: "WS_ERROR", payload: "Error message"}
        const expectedState = {...initialState, error: action.payload}
        return expect(wsFeedsReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle wsMessage", () => {
        const action = {type: "WS_MESSAGE", payload: item}
        const expectedState = {...initialState, orders: action.payload}
        return expect(wsFeedsReducer(initialState, action)).toEqual(expectedState);
    });

})