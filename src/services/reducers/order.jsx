import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_REQUEST_FALIURE,
    GET_INGREDIENTS_REQUEST_SUCCESS
} from "../actions/all-ingredients";

const initialState = {
    orderInfo: [],
    isLoadingOrder: false,
    errorOrder: null,
}

export const orderInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {...state,  isLoadingOrder: true}
        }
        case GET_INGREDIENTS_REQUEST_SUCCESS: {
            return {...state, orderInfo: action.payload, isLoadingOrder: false}
        }
        case GET_INGREDIENTS_REQUEST_FALIURE: {
            return {...state, orderInfo: [], isLoading: false, errorOrder: "Ошибка загрузки данных"}
        }
        default: {
            return state
        }
    }
}