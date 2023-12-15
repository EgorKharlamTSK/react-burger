import {allIngredients} from "./all-ingredients"
import {GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_REQUEST_SUCCESS, GET_INGREDIENTS_REQUEST_FALIURE} from "../actions/all-ingredients";

describe("allIngredients reducer", () => {
    const initialState = { ingredients: [], isLoading: false, error: "", };
    const testIngredient = {
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

    it("should return initial state", () => {
        return expect(allIngredients(undefined, {})).toEqual(initialState);
    });

    it("should handle GET_INGREDIENTS_REQUEST", () => {
        const action = { type: GET_INGREDIENTS_REQUEST};
        const expectedState = { ...initialState, isLoading: true };
        return expect(allIngredients(initialState, action)).toEqual(expectedState);
    });

    it("should handle GET_INGREDIENTS_REQUEST_SUCCESS", () => {
        const ingredients = [testIngredient];
        const action = { type: GET_INGREDIENTS_REQUEST_SUCCESS, payload: ingredients, };
        const expectedState = { ...initialState, ingredients, isLoading: false, };
        return expect(allIngredients(initialState, action)).toEqual(expectedState); });

    it("should handle GET_INGREDIENTS_REQUEST_FAILURE", () => {
        const error = "Ошибка загрузки данных";
        const action = { type: GET_INGREDIENTS_REQUEST_FALIURE, payload: error, };
        const expectedState = { ...initialState, error, isLoading: false, };
        return expect(allIngredients(initialState, action)).toEqual(expectedState);
    });
});
