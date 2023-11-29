import {nanoid} from "@reduxjs/toolkit";
import {IBurgerItemData} from "../../utils/types";
//
export const ADD_INGREDIENT = "ADD_INGREDIENT"
export const DELETE_INGREDIENT = "DELETE_INGREDIENT"
export const REORDER_INGREDIENT = "REORDER_INGREDIENT"
export const RESET_INGREDIENT = "RESET_INGREDIENT"
export const SUM_INGREDIENTS = "SUM_INGREDIENTS"
export const GET_INGREDIENTS_COUNTER = "GET_INGREDIENTS_COUNTER"

// export const addIngredient = (ingredient: IBurgerItemData): any => ({type: ADD_INGREDIENT, payload: {...ingredient,uniqId: nanoid()}})
// export const deleteIngredient = (ingredient: IBurgerItemData): any => ({type: DELETE_INGREDIENT, payload: ingredient.uniqId})
// export const checkSum = (data: any): any => ({type: SUM_INGREDIENTS, payload: data})
// export const ingredientsCounter = (listOfIngredients: any): any => ({type: GET_INGREDIENTS_COUNTER, payload: listOfIngredients})
// export const reorderIngridients = (dragIndex: number, hoverIndex: number): any => ({type: REORDER_INGREDIENT, payload: {from: dragIndex, to: hoverIndex}})
// export const resetConstructor = (): any => ({type: RESET_INGREDIENT})

interface IIngredCount {
    [x: string]: number
}

type addIngredientAction = {
    type: typeof ADD_INGREDIENT;
    payload: IBurgerItemData & { uniqId: string };
}

type deleteIngredientAction = {
    type: typeof DELETE_INGREDIENT;
    payload: string;
}

type reorderIngredientAction = {
    type: typeof REORDER_INGREDIENT;
    payload: { from: number; to: number; };
}

type resetIngredientAction = {
    type: typeof RESET_INGREDIENT;
}

type sumIngredientsAction = {
    type: typeof SUM_INGREDIENTS;
    payload: IBurgerItemData[];
}

type getIngredientsCounterAction = {
    type: typeof GET_INGREDIENTS_COUNTER;
    payload: IIngredCount;
}

export type TBurgerActions = addIngredientAction | deleteIngredientAction | getIngredientsCounterAction | reorderIngredientAction | resetIngredientAction | sumIngredientsAction;


export const addIngredient = (ingredient: IBurgerItemData): addIngredientAction => ({
    type: ADD_INGREDIENT,
    payload: {...ingredient, uniqId: nanoid()}
});

export const deleteIngredient = (ingredient: IBurgerItemData): deleteIngredientAction => ({
    type: DELETE_INGREDIENT,
    payload: ingredient.uniqId
}) as deleteIngredientAction;

export const checkSum = (data: IBurgerItemData[]): sumIngredientsAction => ({
    type: SUM_INGREDIENTS,
    payload: data
});

export const ingredientsCounter = (listOfIngredients: { [x: string]: number; }): getIngredientsCounterAction => ({
    type: GET_INGREDIENTS_COUNTER, payload: listOfIngredients
});

export const reorderIngridients = (dragIndex: number, hoverIndex: number): reorderIngredientAction => ({
    type: REORDER_INGREDIENT, payload: {from: dragIndex, to: hoverIndex}
});

export const resetConstructor = (): resetIngredientAction => ({
    type: RESET_INGREDIENT
});