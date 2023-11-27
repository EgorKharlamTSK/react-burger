import {TRootState} from "../../utils/types";

export const showIngredientInfo = (state: TRootState) => state.currentIngredientInfo.currentIngredientInfo
export const showIngredientLoading = (state: TRootState) => state.currentIngredientInfo.isLoading