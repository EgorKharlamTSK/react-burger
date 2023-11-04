import React, {useEffect, useState} from 'react';
import style from './app.module.css';
import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingridients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {getAllIngredients} from "../../services/actions/all-ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate} from "react-router-dom";
import {Login} from "../../pages/Public/login/login";
import {Register} from "../../pages/Public/register/register";
import {ForgotPassword} from "../../pages/Public/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/Public/reset-password/reset-password";
import {Profile} from "../../pages/Private/profile/profile";
import {ProtectedRouteElement} from "../routes/protected-route";
import {PublicRoute} from "../routes/public-route";
import {IngredientDetailsModal} from "../modal/ingredient-details";
import {BurgerIngredientPage} from "../../pages/Public/burger-ingredient-page/burger-ingredient-page";
import {CHECK_AUTH, checkAuth, profile} from "../../services/actions/profile";
import {getNewToken} from "../../services/actions/update-token";

function App() {
    const wasInForgotPass = useSelector(state => state.auth.forgotPassword.onSendMail)
    const [dataIsLoadingInFront, setDataIsLoading] = useState(true)
    const dispatch = useDispatch()
    const dataIsLoading = useSelector(state => state.allIngredients.isLoading)
    const accessToken = localStorage.getItem("accessToken")
    const isLoggedIn = useSelector(state => state.profileData.isAuth);

    useEffect(() => {
        setDataIsLoading(dataIsLoading)
    }, [dataIsLoading]);

    useEffect(() => {
        dispatch(getAllIngredients())
    }, [dispatch]);


    useEffect(() => {
        if (accessToken) {
            dispatch(profile(`Bearer ${accessToken}`))
        }
    }, [isLoggedIn]);


    return (
        <Router>
            <MainRoute wasInForgotPass={wasInForgotPass} dataIsLoadingInFront={dataIsLoadingInFront} />
        </Router>
    );
}

function MainRoute({ wasInForgotPass, dataIsLoadingInFront }) {
    const location = useLocation()
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
                <Route path="/ingredients/:id" element={<BurgerIngredientPage />} />
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
                </Routes>
            )}
        </>
    )
}

export default App;
