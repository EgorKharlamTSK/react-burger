import {
    SPEC_ORDER_FAILURE,
    SPEC_ORDER_REQUEST,
    SPEC_ORDER_SUCCESS,
    TSpecOrderRequest
} from "../actions/specific-order-feed";
import {ISpecs} from "../../utils/types";

type TState = {
    isLoading: boolean,
    error: string,
    specOrder: ISpecs | null
}

const initialState:TState = {
    isLoading: false,
    error: "",
    specOrder: null
}

export const specOrderFeedReducer = (state = initialState, action: TSpecOrderRequest):TState => {
    switch (action.type) {
        case SPEC_ORDER_REQUEST: {
            return {...state, isLoading: true}
        }
        case SPEC_ORDER_SUCCESS: {
            return {...state, isLoading: false, specOrder: action.payload}
        }
        case SPEC_ORDER_FAILURE: {
            return {...state, isLoading: false, error: action.payload}
        }
        default : {
            return state
        }
    }
}