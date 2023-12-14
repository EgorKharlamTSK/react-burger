import React, {FC, useEffect, useState} from 'react';
import style from './app.module.css';
import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingridients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {getAllIngredients} from "../../services/actions/all-ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {HashRouter as Router, Routes, Route, Navigate, useLocation} from "react-router-dom";
import {Login} from "../../pages/Public/login/login";
import {Register} from "../../pages/Public/register/register";
import {ForgotPassword} from "../../pages/Public/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/Public/reset-password/reset-password";
import {Profile} from "../../pages/Private/profile/profile";
import {ProtectedRouteElement} from "../routes/protected-route";
import {IngredientDetailsModal} from "../modal/ingredient-details";
import {BurgerIngredientPage} from "../../pages/Public/burger-ingredient-page/burger-ingredient-page";
import {checkAuth, profile} from "../../services/actions/profile";
import {TLocation} from "../../utils/types";
import {useDispatch} from "../../services/hooks/use-dispatch"
import {useSelector} from "../../services/hooks/use-selector";
import {Feed} from "../../pages/Private/feed/feed";
import {Orders} from "../orders/orders";
import {FeedIdModal} from "../modal/feed-id-modal";
import {FeedIdPage} from "../../pages/Public/feed-id-page/feed-id-page";
import {OrderPage} from "../../pages/Private/order-page/order-page";
import {OrderIdModal} from "../modal/order-id-modal";

interface IMainRoute {
    wasInForgotPass: boolean
    dataIsLoadingInFront: boolean
}

function App() {
    const wasInForgotPass = useSelector(state => state.auth.forgotPassword.onSendMail)
    const [dataIsLoadingInFront, setDataIsLoading] = useState(true)
    const dispatch = useDispatch()
    const dataIsLoading = useSelector((state) => state.allIngredients.isLoading)
    const accessToken = localStorage.getItem("accessToken")?.split('Bearer ')[1]
    const isLoggedIn = useSelector((state) => state.profileData.isAuth);

    useEffect(() => {
        setDataIsLoading(dataIsLoading)
    }, [dataIsLoading]);

    useEffect(() => {
        dispatch(getAllIngredients())
    }, [dispatch]);

    useEffect(() => {
        if (accessToken) {
            dispatch(profile(`${accessToken}`))
        }
    }, [isLoggedIn]);


    return (
        <Router>
            <MainRoute wasInForgotPass={wasInForgotPass} dataIsLoadingInFront={dataIsLoadingInFront} />
        </Router>
    );
}

const MainRoute:FC<IMainRoute> = ( {wasInForgotPass, dataIsLoadingInFront} ) => {
    const location: TLocation = useLocation()
    const dispatch = useDispatch()

    const state = location.state || {}

    useEffect(() => {
        dispatch(checkAuth())
    }, [location]);

    return (
        <>
            <AppHeader />
            <Routes location={state.backgroundLocation || location }>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={wasInForgotPass ? <ResetPassword /> : <Navigate to="/login" />} />
                <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} />} />
                <Route path="/orders" element={<ProtectedRouteElement element={<Orders />} /> } />
                <Route path="/orders/:number" element={<ProtectedRouteElement element={<OrderPage />} />} />
                <Route path="/ingredients/:id" element={<BurgerIngredientPage />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/feed/:number' element={<FeedIdPage />} />
                <Route path="/" element={
                    <div className={style.app}>
                        <DndProvider backend={HTML5Backend}>
                            {dataIsLoadingInFront
                                ? <main className='mt-10'><p>Ожидайте загрузки ингридиентов</p></main>
                                : <main className='mt-10'><BurgerIngredients /><BurgerConstructor /></main>}
                        </DndProvider>
                    </div>
                }/>
            </Routes>
            {state.backgroundLocation && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <IngredientDetailsModal />
                        }
                    />
                    <Route
                        path="/feed/:number"
                        element={
                            <FeedIdModal />
                        }
                    />
                    <Route
                        path="/orders/:number"
                        element={
                            <ProtectedRouteElement element={
                                <OrderIdModal />
                            } />
                        }
                    />
                </Routes>
            )}
        </>
    )
}

export default App;
