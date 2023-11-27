import {IBurgerItemData} from "../../utils/types";

export const SHOW_INFO_CURRENT_INGREDIENT = "SHOW_INFO_CURRENT_INGREDIENT"
export const HIDE_INFO_CURRENT_INGREDIENT = "HIDE_INFO_CURRENT_INGREDIENT"
// export const showIngredientIfoModal = (ingredient: IBurgerItemData): any => ({type:SHOW_INFO_CURRENT_INGREDIENT, payload:{...ingredient}})
// export const hideIngredientIfoModal = (): any => ({type:HIDE_INFO_CURRENT_INGREDIENT})

type ShowIngredientInfoAction = {
    type: typeof SHOW_INFO_CURRENT_INGREDIENT;
    payload: IBurgerItemData;
};

type HideIngredientInfoAction = {
    type: typeof HIDE_INFO_CURRENT_INGREDIENT;
};

export type TCurrentIngredientAction = ShowIngredientInfoAction | HideIngredientInfoAction;

export const showIngredientInfoModal = (ingredient: IBurgerItemData): ShowIngredientInfoAction => ({
    type: SHOW_INFO_CURRENT_INGREDIENT,
    payload: { ...ingredient },
});

export const hideIngredientInfoModal = (): HideIngredientInfoAction => ({
    type: HIDE_INFO_CURRENT_INGREDIENT,
});