import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {AppHeader} from "./components/appheader/app-header";
import {BurgerIngridients} from "./components/burgeringredients/burger-ingridients";
import {BurgerConstructor} from "./components/burgerconstructor/burger-constructor";
import {getIngredients} from "./utils/api";
import {BurgerConstructorContext} from "./services/burger-constructor-context";
import {useDispatch, useSelector} from "react-redux";
import {getAllIngredients} from "./services/actions/all-ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    const [fetchData, setFetchData] = useState([])
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
    <div className="App">
        <DndProvider backend={HTML5Backend}>
            <AppHeader />
            {dataIsLoadingInFront ? (
                <main className='mt-10'>
                    <p>Ожидайте загрузки ингридиентов</p>
                </main>
                ) : (
                <main className='mt-10'>
                        <BurgerIngridients />
                        <BurgerConstructor />
                </main>
            )}
        </DndProvider>
    </div>
  );
}

export default App;
