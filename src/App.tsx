import React from 'react';
import './App.css';
import {AppHeader} from "./components/appheader/AppHeader";
import {BurgerIngredients} from "./components/burgeringredients/BurgerIngredients";

function App() {
  return (
    <div className="App">
      <AppHeader />
        <main>
            <section>
                <BurgerIngredients />
            </section>
            <section>
                <h1>ЗДЕСЬ БУДЕТ ЕЩЕ КОЕ ЧТО</h1>
            </section>
        </main>
    </div>
  );
}

export default App;
