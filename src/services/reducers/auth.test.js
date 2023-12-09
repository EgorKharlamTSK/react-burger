import {authReducer} from "./auth"
import {
    AUTH_REQUEST,
    AUTH_REQUEST__FAILURE,
    AUTH_REQUEST__SUCCESS,
    FORGOT_PASSWORD, FORGOT_PASSWORD__FAILURE,
    FORGOT_PASSWORD__SUCCESS,
    RESET_AUTH
} from "../actions/auth";

describe("auth reducer", () => {
    const initialState = {
        success: false,
        accessToken: null,
        refreshToken: null,
        user: {
            email: null,
            name: null
        },
        isLoading: false,
        forgotPassword: {
            onSendMail: false,
            isLoadingPasswordReq: false,
            success: false,
            message: null
        }
    }
    const testResponse = {
        success: false,
        accessToken: "123",
        refreshToken: "123",
        user: {
            email: "test@mail.ru",
            name: "test"
        },
        isLoading: false,
        forgotPassword: {
            onSendMail: false,
            isLoadingPasswordReq: false,
            success: false,
            message: "Text message"
        }
    }

    it("should return the initial state", () => {
        return expect(authReducer( undefined, {})).toEqual(initialState)
    })

    it("should handle AUTH_REQUEST ", () => {
        const action = {type: AUTH_REQUEST};
        const expectedState = {...initialState, isLoading: true}
        return expect(authReducer(initialState, action)).toEqual(expectedState);
    })

    it("should handle AUTH_REQUEST__SUCCESS", () => {
        const authData = {
            accessToken: "123",
            refreshToken: "123",
            user: {
                email: "test@mail.ru",
                name: "test"
            }
        }
        const action = {type: AUTH_REQUEST__SUCCESS, payload: authData}
        const expectedState = {
            ...initialState,
            isLoading: false,
            success: true,
            user: {
                email: "test@mail.ru",
                name: "test"
            },
            accessToken: "123",
            refreshToken: "123"
        }
        return expect(authReducer(initialState, action)).toEqual(expectedState)
    })

    it("should handle AUTH_REQUEST__FAILURE", () => {
        const failureData = {
            success: false,
            message: "Text message"
        }
        const action = {type: AUTH_REQUEST__FAILURE, payload: failureData}
        const expectedState = {...initialState, isLoading: false, errorMessage: failureData, success: false}
        return expect(authReducer(initialState, action)).toEqual(expectedState)
    })

    it("should handle RESET_AUTH", () => {
        const action = {type: RESET_AUTH}
        return expect(authReducer(initialState, action)).toEqual(initialState)
    })

    it("should handle FORGOT_PASSWORD", () => {
        const action = {type: FORGOT_PASSWORD}
        const expectedState = {
            ...initialState,
            forgotPassword: {...initialState.forgotPassword, isLoadingPasswordReq: true, onSendMail: true}
        }
        return expect(authReducer(initialState, action)).toEqual(expectedState)
    })

    it("should handle FORGOT_PASSWORD__SUCCESS", () => {
        const forgotData = {
            success: false,
            message: "Text message"
        }
        const action = {type: FORGOT_PASSWORD__SUCCESS, payload: forgotData}
        const expectedState = {
            ...initialState,
            forgotPassword: {
                ...initialState.forgotPassword,
                success: false,
                message: testResponse.forgotPassword.message,
                isLoadingPasswordReq: false
            }
        }
        return expect(authReducer(initialState, action)).toEqual(expectedState)
    })

    it("should handle FORGOT_PASSWORD__FAILURE", () => {
        const forgotData = {
            success: false,
            message: "Text message"
        }
        const action = {type: FORGOT_PASSWORD__FAILURE, payload: forgotData}
        const expectedState = {...initialState,
            forgotPassword: {
                ...initialState.forgotPassword,
                success: forgotData.success,
                isLoadingPasswordReq: false,
                message: forgotData.message
            }
        }
        return expect(authReducer(initialState, action)).toEqual(expectedState)
    })

})