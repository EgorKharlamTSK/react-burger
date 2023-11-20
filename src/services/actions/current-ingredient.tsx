import {IBurgerItemData} from "../../utils/types";

export const SHOW_INFO_CURRENT_INGREDIENT = "SHOW_INFO_CURRENT_INGREDIENT"
export const HIDE_INFO_CURRENT_INGREDIENT = "HIDE_INFO_CURRENT_INGREDIENT"
export const showIngredientIfoModal = (ingredient: IBurgerItemData): any => ({type:SHOW_INFO_CURRENT_INGREDIENT, payload:{...ingredient}})
export const hideIngredientIfoModal = (): any => ({type:HIDE_INFO_CURRENT_INGREDIENT})