import {resetPasswordReducer} from "./reset-password";
import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST__FAILURE,
    RESET_PASSWORD_REQUEST__SUCCESS
} from "../actions/reset-password";

describe("resetPasswordReducer reducer", () => {
    const initialState = {
        success: false,
        message: "",
        isLoading: false
    }

    it("should return initial state", () => {
        return expect(resetPasswordReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle RESET_PASSWORD_REQUEST", () => {
        const action = { type: RESET_PASSWORD_REQUEST};
        const expectedState = {...initialState, isLoading: true}
        return expect(resetPasswordReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle RESET_PASSWORD_REQUEST__SUCCESS", () => {
        const action = { type: RESET_PASSWORD_REQUEST__SUCCESS, payload: {message: "Success message"}};
        const expectedState = {...initialState, success: true, message: action.payload.message}
        return expect(resetPasswordReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle RESET_PASSWORD_REQUEST__FAILURE", () => {
        const action = { type: RESET_PASSWORD_REQUEST__FAILURE};
        const expectedState = {...initialState, isLoading: false, success: false}
        return expect(resetPasswordReducer(initialState, action)).toEqual(expectedState);
    });
})