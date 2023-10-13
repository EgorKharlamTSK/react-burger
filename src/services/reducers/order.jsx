import {GET_ORDER_REQUEST, GET_ORDER_REQUEST_FALIURE, GET_ORDER_REQUEST_SUCCESS, SUM_ORDER} from "../actions/order";

const initialState = {
    orderInfo: [],
    isLoadingOrder: false,
    errorOrder: null,
    sum: null
}

export const orderInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {...state,  isLoadingOrder: true}
        }
        case GET_ORDER_REQUEST_SUCCESS: {
            return {...state, orderInfo: action.payload, isLoadingOrder: false}
        }
        case GET_ORDER_REQUEST_FALIURE: {
            return {...state, orderInfo: [], isLoading: false, errorOrder: "Ошибка загрузки данных"}
        }
        default: {
            return state
        }
    }
}