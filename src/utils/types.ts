import {Dispatch, ReactElement, ReactNode} from "react";
import {Location} from "react-router-dom";
import PropTypes from "prop-types";
import {ProtectedRouteElement} from "../components/routes/protected-route";

export type TDispatch = Dispatch<any>
export type TLocation = Location<any>

export interface IBurgerItemData {
    _id: string
    name:string
    type: string
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v: number
    uniqId?: number
}

export interface IBurgerIngredientsItemType  {
    title: string
    data: IBurgerItemData[]
}

export interface IBurgerConstructorMiddleElement {
    ingredient: IBurgerItemData
    index: number
    deleteIngredientFromFront: (ingredient: IBurgerItemData) => void
}

export interface IBurgerIngredientsButton {
    isOpenModal: boolean,
    item: IBurgerItemData,
    handleModal: (item: IBurgerItemData) => void
}

export interface IModalPropTypes {
    title?: string,
    closeModal: () => void,
    children: ReactNode
}

export interface IModalOverlayPropTypes {
    closeModal: () => void,
}

export interface IOrderDetailsModal {
    handleModal: () => void
}

export interface IProtectedRouteElement {
    element: ReactElement,
    anonymous?: boolean
}

export interface IRefreshData {
    success: boolean;
    refreshToken: string;
    accessToken: string;
}