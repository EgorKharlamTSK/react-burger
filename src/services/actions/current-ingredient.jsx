export const SHOW_INFO_CURRENT_INGREDIENT = "SHOW_INFO_CURRENT_INGREDIENT"
export const HIDE_INFO_CURRENT_INGREDIENT = "HIDE_INFO_CURRENT_INGREDIENT"
export const showIngredientIfoModal = (ingredient) => ({type:SHOW_INFO_CURRENT_INGREDIENT, payload:{...ingredient}})
export const hideIngredientIfoModal = () => ({type:HIDE_INFO_CURRENT_INGREDIENT})