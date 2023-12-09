import {constructorReducer} from "./burger-constructor"
import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT, GET_INGREDIENTS_COUNTER,
    REORDER_INGREDIENT,
    RESET_INGREDIENT,
    SUM_INGREDIENTS
} from "../actions/burger-constructor";
import {nanoid} from "@reduxjs/toolkit";
import update from "immutability-helper";

describe("constructorReducer reducer", () => {

    const initialState = {
        constructorIngredients: [],
        sum: null,
        listOfCounterIngredients: {}
    }

    const testIngr = {
        _id: 1,
        name: "ingredient 1",
        type: "bun",
        proteins: 1,
        fat: 2,
        carbohydrates: 2,
        calories: 100,
        price: 100,
        image: "ya.ru/img",
        image_mobile: "ya.ru/img_mobile",
        image_large: "ya.ru/img_large",
        __v: 0,
        uniqId: 101,
        count: 1
    }

    const testResponse = {
        constructorIngredients: [testIngr],
        sum: 100,
        listOfCounterIngredients: {
            d69a5c3f7b9001cfa093d: 2
        }
    }

    it("should return initial state", () => {
        return expect(constructorReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle GET_INGREDIENTS_REQUEST", () => {
        const data = testIngr
        const action = { type: ADD_INGREDIENT, payload: testIngr};
        const expectedState = {
            ...initialState,
            constructorIngredients: [...initialState.constructorIngredients, testIngr]
        }
        return expect(constructorReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle DELETE_INGREDIENT", () => {
        const action = { type: DELETE_INGREDIENT, payload: 101};
        const expectedState = {
            ...initialState,
            constructorIngredients: [...initialState.constructorIngredients]
        }
        return expect(constructorReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle SUM_INGREDIENTS", () => {
        const action = { type: SUM_INGREDIENTS, payload: [testIngr]};
        const expectedState = {...initialState, sum: testResponse.sum}
        return expect(constructorReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle REORDER_INGREDIENT", () => {
        const fromTo = { from: 1, to: 2 }
        const newIngredients = update(initialState.constructorIngredients, {
            $splice: [
                [fromTo.from, 1],
                [fromTo.to, 0, initialState.constructorIngredients[fromTo.from]]
            ],
        });
        const action = { type: REORDER_INGREDIENT, payload: fromTo};
        const expectedState = {...initialState, constructorIngredients: newIngredients}
        return expect(constructorReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle RESET_INGREDIENT", () => {
        const action = { type: RESET_INGREDIENT};
        return expect(constructorReducer(initialState, action)).toEqual(initialState);
    });

    it("should handle GET_INGREDIENTS_COUNTER", () => {
        const countIngred = {"d6y2986u": 8}
        const action = { type: GET_INGREDIENTS_COUNTER, payload: {"d6y2986u": 8}};
        const expectedState = {...initialState, listOfCounterIngredients: countIngred}
        return expect(constructorReducer(initialState, action)).toEqual(expectedState);
    });

})