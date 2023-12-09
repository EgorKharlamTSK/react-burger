import {REFRESH_TOKEN, REFRESH_TOKEN__FAILURE, REFRESH_TOKEN__SUCCESS} from "../actions/update-token";
import {updateTokenReducer} from "./update-token";

describe("updateTokenReducer reducer", () => {
    const initialState = {
        isLoading: false,
        error: '',
        success: true,
        accessToken: '',
        refreshToken: ''
    }

    it("should return initial state", () => {
        return expect(updateTokenReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle REFRESH_TOKEN", () => {
        const action = {type: REFRESH_TOKEN}
        const expectedState = {...initialState, isLoading: true}
        return expect(updateTokenReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle REFRESH_TOKEN__SUCCESS", () => {
        const action = {
            type: REFRESH_TOKEN__SUCCESS,
            payload: {
                accessToken: "123qwerty",
                refreshToken: "321cvbn"
            }}
        const expectedState = {
            ...initialState,
            isLoading: false,
            success: true,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken
        }
        return expect(updateTokenReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle REFRESH_TOKEN__FAILURE", () => {
        const action = {type: REFRESH_TOKEN__FAILURE, payload: "Error message"}
        const expectedState = {...initialState, isLoading: false, error: action.payload, success: false}
        return expect(updateTokenReducer(initialState, action)).toEqual(expectedState);
    });
})
