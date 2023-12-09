import {quitReducer} from "./quit-user";
import {QUIT__FAILURE, QUIT__SUCCESS, QUIT_REQUEST} from "../actions/quit-user";

describe("quitReducer reducer", () => {
    const initialState = {
        success: false,
        message: null,
        isLoading: true
    }

    it("should return initial state", () => {
        return expect(quitReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle QUIT_REQUEST", () => {
        const action = { type: QUIT_REQUEST};
        const expectedState = {...initialState, isLoading: true};
        return expect(quitReducer(initialState, action)).toEqual(expectedState);
    })

    it("should handle QUIT__SUCCESS", () => {
        const action = { type: QUIT__SUCCESS, payload: "Success message"};
        const expectedState = {...initialState, isLoading: false, success: true, message: action.payload.message};
        return expect(quitReducer(initialState, action)).toEqual(expectedState);
    })

    it("should handle QUIT__FAILURE", () => {
        const action = { type: QUIT__FAILURE, payload: "Error message"};
        const expectedState = {...initialState, isLoading: false, errorMessage: action.payload, success: false};
        return expect(quitReducer(initialState, action)).toEqual(expectedState);
    })
})