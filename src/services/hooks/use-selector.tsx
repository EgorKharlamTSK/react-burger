import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
} from "react-redux";
import {TRootState} from "../../utils/types";

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;