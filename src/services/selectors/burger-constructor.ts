import {TRootState} from "../../utils/types";

export const getConstructorIngredients = (state: TRootState) => state.constructorReducer.constructorIngredients
export const getSumOfOrder = (state: TRootState) => state.constructorReducer.sum