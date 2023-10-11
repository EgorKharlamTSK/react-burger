import {nanoid} from "@reduxjs/toolkit";

export const ADD_INGREDIENT = "ADD_INGREDIENT"
export const DELETE_INGREDIENT = "DELETE_INGREDIENT"
export const REORDER_INGREDIENT = "REORDER_INGREDIENT"
export const RESET_INGREDIENT = "RESET_INGREDIENT"

export const addIngredient = (ingredient) => ({type: ADD_INGREDIENT, payload: {...ingredient,uniqId: nanoid()}})
export const deleteIngredient = (ingredient) => ({type: DELETE_INGREDIENT, payload: ingredient.uniqId})