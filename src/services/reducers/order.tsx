import {
    GET_ORDER_REQUEST,
    GET_ORDER_REQUEST_FALIURE,
    GET_ORDER_REQUEST_SUCCESS,
    TOrderInfoActions
} from "../actions/order";

// const initialState = {
//     orderInfo: [],
//     isLoadingOrder: false,
//     errorOrder: null,
//     sum: null
// }
//
// export const orderInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
//     switch (action.type) {
//         case GET_ORDER_REQUEST: {
//             return {...state,  isLoadingOrder: true}
//         }
//         case GET_ORDER_REQUEST_SUCCESS: {
//             return {...state, orderInfo: action.payload, isLoadingOrder: false}
//         }
//         case GET_ORDER_REQUEST_FALIURE: {
//             return {...state, orderInfo: [], isLoading: false, errorOrder: "Ошибка загрузки данных"}
//         }
//         default: {
//             return state
//         }
//     }
// }

type TOrderInfoState = {
    orderInfo: any[], // "any" должен быть заменен на надлежащий тип
    isLoadingOrder: boolean,
    errorOrder: string | null,
    sum: number | null
};

const initialState: TOrderInfoState = {
    orderInfo: [],
    isLoadingOrder: false,
    errorOrder: null,
    sum: null
};

export const orderInfoReducer = (state: TOrderInfoState = initialState, action: TOrderInfoActions): TOrderInfoState => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return { ...state, isLoadingOrder: true };
        }
        case GET_ORDER_REQUEST_SUCCESS: {
            return { ...state, orderInfo: action.payload, isLoadingOrder: false };
        }
        case GET_ORDER_REQUEST_FALIURE: {
            return { ...state, orderInfo: [], isLoadingOrder: false, errorOrder: "Ошибка загрузки данных" };
        }
        default: {
            return state;
        }
    }
}