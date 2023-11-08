import {nanoid} from "@reduxjs/toolkit";
import {IBurgerItemData} from "../../utils/types";

export const ADD_INGREDIENT = "ADD_INGREDIENT"
export const DELETE_INGREDIENT = "DELETE_INGREDIENT"
export const REORDER_INGREDIENT = "REORDER_INGREDIENT"
export const RESET_INGREDIENT = "RESET_INGREDIENT"
export const SUM_INGREDIENTS = "SUM_INGREDIENTS"
export const GET_INGREDIENTS_COUNTER = "GET_INGREDIENTS_COUNTER"

export const addIngredient = (ingredient: IBurgerItemData): any => ({type: ADD_INGREDIENT, payload: {...ingredient,uniqId: nanoid()}})
export const deleteIngredient = (ingredient: IBurgerItemData): any => ({type: DELETE_INGREDIENT, payload: ingredient.uniqId})
export const checkSum = (data: any): any => ({type: SUM_INGREDIENTS, payload: data})
export const ingredientsCounter = (listOfIngredients: any): any => ({type: GET_INGREDIENTS_COUNTER, payload: listOfIngredients})
export const reorderIngridients = (dragIndex: number, hoverIndex: number): any => ({type: REORDER_INGREDIENT, payload: {from: dragIndex, to: hoverIndex}})
export const resetConstructor = (): any => ({type: RESET_INGREDIENT})