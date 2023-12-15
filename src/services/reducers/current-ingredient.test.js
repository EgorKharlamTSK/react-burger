import {currentIngredientInfoReducer} from "./current-ingredient";
import {HIDE_INFO_CURRENT_INGREDIENT, SHOW_INFO_CURRENT_INGREDIENT} from "../actions/current-ingredient";

describe("currentIngredientInfoReducer reducer", () => {
    const initialState = {
        currentIngredientInfo: undefined,
        isLoading: false
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

    const testResp = {
        currentIngredientInfo: testIngr,
        isLoading: false
    }

    it("should return initial state", () => {
        return expect(currentIngredientInfoReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle SHOW_INFO_CURRENT_INGREDIENT", () => {
        const action = {type: SHOW_INFO_CURRENT_INGREDIENT, payload: testIngr}
        const expectedState = {
            currentIngredientInfo: testIngr,
            isLoading: true
        }
        return expect(currentIngredientInfoReducer(initialState, action)).toEqual(expectedState);
    })

    it("should handle HIDE_INFO_CURRENT_INGREDIENT", () => {
        const action = {type: HIDE_INFO_CURRENT_INGREDIENT}
        const expectedState = {
            currentIngredientInfo: undefined,
            isLoading: false
        }
        return expect(currentIngredientInfoReducer(initialState, action)).toEqual(expectedState);
    })
})