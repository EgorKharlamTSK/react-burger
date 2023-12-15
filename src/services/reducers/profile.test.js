import {profileInfoReducer} from "./profile";
import {
    CHECK_AUTH, CHECK_AUTH__FAILURE,
    CHECK_AUTH__SUCCESS, EDIT_PROFILE, EDIT_PROFILE__FAILURE, EDIT_PROFILE__SUCCESS,
    GET_PROFILE_INFO,
    GET_PROFILE_INFO__FAILURE,
    GET_PROFILE_INFO__SUCCESS, RESET_PROFILE
} from "../actions/profile";

describe("constructorReducer reducer", () => {
    const initialState = {
        success: false,
        user: { email: "", name: "" },
        isLoading: false,
        isAuth: false,
        isAuthLoading: false
    }

    it("should return initial state", () => {
        return expect(profileInfoReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle GET_PROFILE_INFO", () => {
        const action = { type: GET_PROFILE_INFO};
        const expectedState = {
            ...initialState,
            isLoading: true
        }
        return expect(profileInfoReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle GET_PROFILE_INFO__SUCCESS", () => {
        const userPayload = { email: "name@name.com", name: "name" }
        const action = { type: GET_PROFILE_INFO__SUCCESS, payload: { email: "name@name.com", name: "name" }};
        const expectedState = {...initialState, isLoading: false, success: true, user: userPayload, isAuth: true, isAuthLoading: false}
        return expect(profileInfoReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle GET_PROFILE_INFO__FAILURE", () => {
        const action = { type: GET_PROFILE_INFO__FAILURE, payload: { email: "name@name.com", name: "name" }};
        const expectedState = {...initialState, isLoading: false, success: false, isAuth: false, isAuthLoading: false}
        return expect(profileInfoReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle CHECK_AUTH", () => {
        const action = { type: GET_PROFILE_INFO__FAILURE};
        const expectedState = {...initialState, isAuthLoading: false}
        return expect(profileInfoReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle CHECK_AUTH__SUCCESS", () => {
        const action = { type: CHECK_AUTH__SUCCESS, payload: true};
        const expectedState = {...initialState, isAuth: true, isAuthLoading: false}
        return expect(profileInfoReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle CHECK_AUTH__FAILURE", () => {
        const action = { type: CHECK_AUTH__FAILURE, payload: false};
        const expectedState = {...initialState, isAuth: false, isAuthLoading: false}
        return expect(profileInfoReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle RESET_PROFILE", () => {
        const action = { type: RESET_PROFILE};
        const expectedState = {...initialState}
        return expect(profileInfoReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle EDIT_PROFILE", () => {
        const action = { type: EDIT_PROFILE};
        const expectedState = {...initialState, isLoading: true}
        return expect(profileInfoReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle EDIT_PROFILE__SUCCESS", () => {
        const action = { type: EDIT_PROFILE__SUCCESS, payload: { email: "name@name.com", name: "name" }};
        const expectedState = {...initialState, isLoading: false, success: true, user: action.payload}
        return expect(profileInfoReducer(initialState, action)).toEqual(expectedState);
    });


    it("should handle EDIT_PROFILE__FAILURE", () => {
        const action = { type: EDIT_PROFILE__FAILURE, payload: { email: "name@name.com", name: "name" }};
        const expectedState = {...initialState, isLoading: false, success: false}
        return expect(profileInfoReducer(initialState, action)).toEqual(expectedState);
    });
})