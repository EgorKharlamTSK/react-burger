import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {AppHeader} from "./components/appheader/app-header";
import {BurgerIngridients} from "./components/burgeringredients/burger-ingridients";
import {BurgerConstructor} from "./components/burgerconstructor/burger-constructor";
import {getIngredients} from "./utils/api";
import {BurgerConstructorContext} from "./services/burger-constructor-context";

function App() {
    const [fetchData, setFetchData] = useState([])
    const [dataIsLoading, setDataIsLoading] = useState(true)

    useEffect(() => {
       getIngredients()
            .then(setFetchData)
            .catch(er => console.log("Ошибка загрузки данных " + er))
            .finally(() => setDataIsLoading(false))
    }, []);

  return (
    <div className="App">
      <AppHeader />
        {dataIsLoading ? (
            <main className='mt-10'>
                <p>Ожидайте загрузки ингридиентов</p>
            </main>
            ) : (
           <BurgerConstructorContext.Provider value={fetchData}>
                <main className='mt-10'>
                    <BurgerIngridients />
                    <BurgerConstructor />
                </main>
           </BurgerConstructorContext.Provider>
        )}
    </div>
  );
}

export default App;
