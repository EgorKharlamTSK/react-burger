import React from 'react';
import './App.css';
import {AppHeader} from "./components/appheader/AppHeader";
import {BurgerIngredients} from "./components/burgeringredients/BurgerIngredients";
import {BurgerConstructor} from "./components/burgerconstructor/BurgerConstructor";

function App() {
  return (
    <div className="App">
      <AppHeader />
        <main>
            <section className='mt-10'>
                <BurgerIngredients />
            </section>
            <section>
                <BurgerConstructor />
            </section>
        </main>
    </div>
  );
}

export default App;
