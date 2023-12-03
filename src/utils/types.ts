import { ReactElement, ReactNode} from "react";
import {Location} from "react-router-dom";
import { Dispatch } from 'redux';
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TGetIngredient} from "../services/actions/all-ingredients";
import {TAuth} from "../services/actions/auth";
import {TBurgerActions} from "../services/actions/burger-constructor";
import {TCurrentIngredientAction} from "../services/actions/current-ingredient";
import {TOrderInfoActions} from "../services/actions/order";
import {TProfileActionTypes} from "../services/actions/profile";
import {TQuitActionTypes} from "../services/actions/quit-user";
import {TRegistrationRequest} from "../services/actions/registration";
import {TResetPassword} from "../services/actions/reset-password";
import {TRefreshTokeAction} from "../services/actions/update-token";
import {rootReducer} from "../services/reducers/root-reducer";
import {
    TWSActions
} from "../services/actions/ws-actions";
import {TSpecOrderRequest} from "../services/actions/specific-order-feed";

export type TDispatch = Dispatch
export type TLocation = Location<any>

export enum WebsocketStatus {
    CONNECTING =  "CONNECTING...",
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE"
}

export interface IOrdersInfo {
    success: boolean,
    name: string,
    order: IBurgerItemData[]
}

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
    uniqId?: number | string | undefined
    count?:number
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

export interface IWsFeedsItem {
    ingredients: string[],
    _id: string,
    status: string,
    number: string,
    createdAt: string,
    updatedAt: string
    name: string
    owner?: string
    __v?: number
}

export interface IWsFeed {
    success: boolean,
    orders: IWsFeedsItem[]
    total: number,
    totalToday: number
}

export interface ISpecOrder {
    success: boolean;
    orders: IOrders[];
}


export interface ISpecs {
    error: string
    isLoading: boolean
    specOrder: ISpecOrder | null
    orders?: IOrders[];
}

export interface IOrders{
    _id: string,
    ingredients: Array<string>,
    owner: string,
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number,
    __v: number
}

export type TApplicationActions = |
    TGetIngredient |
    TAuth |
    TBurgerActions |
    TCurrentIngredientAction |
    TOrderInfoActions |
    TProfileActionTypes |
    TQuitActionTypes |
    TRegistrationRequest |
    TResetPassword |
    TRefreshTokeAction |
    TWSActions |
    TSpecOrderRequest

export type TAppActions = TWSActions | TApplicationActions
export type TRootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<TRootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, TApplicationActions>;