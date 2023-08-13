import React, {useEffect, useState} from 'react';
import './App.css';
import {AppHeader} from "./components/appheader/app-header";
import {BurgerIngridients} from "./components/burgeringredients/burger-ingridients";
import {BurgerConstructor} from "./components/burgerconstructor/burger-constructor";
import {getIngredients} from "./utils/api";
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
            <main className='mt-10'>
                <BurgerIngridients ingridientsData={fetchData}/>
                <BurgerConstructor  constructorData={fetchData}/>
            </main>
        )}
    </div>
  );
}

export default App;
