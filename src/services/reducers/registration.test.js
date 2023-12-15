import {registrationReducer} from "./registration";
import {
    REGISTRATION_REQUEST,
    REGISTRATION_REQUEST__FAILURE,
    REGISTRATION_REQUEST__SUCCESS
} from "../actions/registration";

describe("registrationReducer reducer", () => {
    const initialState = {
        success: false,
        user: {
            email: '',
            name: ''
        },
        accessToken: '',
        refreshToken: '',
        isLoading: false,
        errorMessage: ''
    }


    it("should return initial state", () => {
        return expect(registrationReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle REGISTRATION_REQUEST", () => {
        const action = { type: REGISTRATION_REQUEST};
        const expectedState = {...initialState, isLoading: true};
        return expect(registrationReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle REGISTRATION_REQUEST__SUCCESS", () => {
        const action = {
            type: REGISTRATION_REQUEST__SUCCESS,
            payload: {
                user: {
                    email: "email@email.com",
                    name: "name"
                },
                accessToken: "123qwerty",
                refreshToken: "321cvbn",
            }
        }
        const expectedState = {
            ...initialState,
            isLoading: false,
            success: true,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken
        }
        return expect(registrationReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle REGISTRATION_REQUEST__FAILURE", () => {
        const action = { type: REGISTRATION_REQUEST__FAILURE, payload: "Error message"};
        const expectedState = {...initialState, isLoading: false, errorMessage: action.payload, success: false}
        return expect(registrationReducer(initialState, action)).toEqual(expectedState);
    });

})