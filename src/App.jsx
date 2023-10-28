import React, {useEffect, useState} from 'react';
import './App.css';
import {AppHeader} from "./components/appheader/app-header";
import {BurgerIngredients} from "./components/burgeringredients/burger-ingridients";
import {BurgerConstructor} from "./components/burgerconstructor/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {getAllIngredients} from "./services/actions/all-ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from "react-router-dom";
import {Login} from "./pages/Public/login/login";
import {Register} from "./pages/Public/register/register";
import {ForgotPassword} from "./pages/Public/forgotpassword/forgot-password";
import {ResetPassword} from "./pages/Public/resetpassword/reset-password";
import {Profile} from "./pages/Private/profile/profile";
import {ProtectedRouteElement} from "./components/routes/protected-route";
import {PublicRoute} from "./components/routes/public-route";
import {IngredientDetailsModal} from "./components/modal/ingredient-details";
import {BurgerIngredientPage} from "./components/burgeringredients/burger-ingredient-page";
import {showIngredientInfo} from "./services/selectors/current-ingredient-info";
import {hideIngredientIfoModal, showIngredientIfoModal} from "./services/actions/current-ingredient";

function App() {
    const wasInForgotPass = useSelector(state => state.auth.forgotPassword.onSendMail)
    const [dataIsLoadingInFront, setDataIsLoading] = useState(true)
    const dispatch = useDispatch()
    const dataIsLoading = useSelector(state => state.allIngredients.isLoading)

    useEffect(() => {
        setDataIsLoading(dataIsLoading)
    }, [dataIsLoading]);

    useEffect(() => {
        dispatch(getAllIngredients())
    }, [dispatch]);

    return (
        <Router>
            <MainRoute wasInForgotPass={wasInForgotPass} dataIsLoadingInFront={dataIsLoadingInFront} />
        </Router>
    );
}

function MainRoute({ wasInForgotPass, dataIsLoadingInFront }) {
    const location = useLocation()
    const state = location.state || {}
    const dispatch = useDispatch()
    const selectedItem = useSelector(showIngredientInfo)
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [ingredientInModal, setIngredientInModal] = useState()
    const handleModal = (item) => {
        dispatch(showIngredientIfoModal(item))
        setIsOpenModal(!isOpenModal);
    }

    useEffect(() => {
        setIngredientInModal(selectedItem[0])
    }, [selectedItem])

    useEffect(() => {
        if (!isOpenModal){
            dispatch(hideIngredientIfoModal())
        }
    }, [isOpenModal])

    useEffect(() => {
        console.log(location)
    }, [location]);


    return (
        <>
            <AppHeader />
            <Routes location={state.backgroundLocation || location }>
                <Route path="/login" element={<PublicRoute element={<Login />} />} />
                <Route path="/register" element={<PublicRoute element={<Register />} />} />
                <Route path="/forgot-password" element={<PublicRoute element={<ForgotPassword />} />} />
                <Route path="/reset-password" element={wasInForgotPass ? <ResetPassword /> : <Navigate to="/login" />} />
                <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} />} />
                <Route path="/ingredients/:id" element={<BurgerIngredientPage selectedItem={selectedItem[0]} />} />
                <Route path="/" element={
                    <ProtectedRouteElement
                        element={
                            <div className="App">
                                <DndProvider backend={HTML5Backend}>
                                    {dataIsLoadingInFront
                                        ? <main className='mt-10'><p>Ожидайте загрузки ингридиентов</p></main>
                                        : <main className='mt-10'><BurgerIngredients /><BurgerConstructor /></main>}
                                </DndProvider>
                            </div>
                        }
                    />
                }/>
            </Routes>
            {state.backgroundLocation && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            isOpenModal && <IngredientDetailsModal handleModal={handleModal} selectedItem={ingredientInModal} />
                        }
                    />
                </Routes>
            )}
        </>
    )
}

export default App;
