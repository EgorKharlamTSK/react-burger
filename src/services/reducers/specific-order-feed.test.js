import {specOrderFeedReducer} from "./specific-order-feed";
import {SPEC_ORDER_FAILURE, SPEC_ORDER_REQUEST, SPEC_ORDER_SUCCESS} from "../actions/specific-order-feed";

describe("specOrderFeedReducer reducer", () => {
    const initialState = {
        isLoading: false,
        error: "",
        specOrder: null
    }

    const specOrder = {
        success: false,
        orders: null
    }

    const specs =  {
        error: "Error message",
        isLoading: false,
        specOrder: specOrder,
        orders: null
    }

    const order = {
        _id: "123qwerty",
        ingredients: [
            "123sasdfs1",
            "123sasdfs2",
            "123sasdfs3",
        ],
        owner: "232asdas",
        status: "done",
        name: "Burger",
        createdAt: "2024-05-12",
        updatedAt: "2024-05-13",
        number: "77",
        __v: 7
    }

    it("should return initial state", () => {
        return expect(specOrderFeedReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle SPEC_ORDER_REQUEST", () => {
        const action = { type: SPEC_ORDER_REQUEST};
        const expectedState = {...initialState, isLoading: true}
        return expect(specOrderFeedReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle SPEC_ORDER_SUCCESS", () => {
        const action = { type: SPEC_ORDER_SUCCESS, payload: specOrder};
        const expectedState = {...initialState, isLoading: false, specOrder: action.payload}
        return expect(specOrderFeedReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle SPEC_ORDER_FAILURE", () => {
        const action = { type: SPEC_ORDER_FAILURE, payload: "Error message"};
        const expectedState = {...initialState, isLoading: false, error: action.payload}
        return expect(specOrderFeedReducer(initialState, action)).toEqual(expectedState);
    });
})