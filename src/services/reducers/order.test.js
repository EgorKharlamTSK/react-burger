import {orderInfoReducer} from "./order";
import {GET_ORDER_REQUEST, GET_ORDER_REQUEST_FALIURE, GET_ORDER_REQUEST_SUCCESS} from "../actions/order";

describe("orderInfoReducer reducer", () => {

    const initialState = {
        orderInfo: null,
        isLoadingOrder: false,
        errorOrder: null,
        sum: null
    };

    const testOrder = {
        _id: 1,
        ingredients: [
            "jgp976hky6",
            "jgp976hky8",
            "jgp976hky9"
        ],
        owner: "6b9o098",
        status: "done",
        name: "ingredient 1",
        createdAt: "2024-06-08",
        updatedAt: "2024-06-09",
        number: "23",
        __v: 9
    }

    const ordersInfo = {
        success: false,
        name: "burger",
        order: testOrder
    }

    const testResp = {
        orderInfo: ordersInfo,
        isLoadingOrder: false,
        errorOrder: "Error message",
        sum: 101
    }

    it("should return initial state", () => {
        return expect(orderInfoReducer(undefined, {})).toEqual(initialState);
    })

    it("should handle GET_ORDER_REQUEST", () => {
        const action = {type:GET_ORDER_REQUEST}
        const expectedState = {...initialState, isLoadingOrder: true}
        return expect(orderInfoReducer(initialState, action)).toEqual(expectedState);
    })

    it("should handle GET_ORDER_REQUEST_SUCCESS", () => {
        const action = {type:GET_ORDER_REQUEST_SUCCESS, payload: ordersInfo}
        const expectedState = {...initialState, isLoadingOrder: false, orderInfo: ordersInfo}
        return expect(orderInfoReducer(initialState, action)).toEqual(expectedState);
    })

    it("should handle GET_ORDER_REQUEST_FALIURE", () => {
        const action = {type:GET_ORDER_REQUEST_FALIURE, payload: ordersInfo}
        const expectedState = {...initialState, isLoadingOrder: false, orderInfo: null, errorOrder: "Ошибка загрузки данных"}
        return expect(orderInfoReducer(initialState, action)).toEqual(expectedState);
    })

})