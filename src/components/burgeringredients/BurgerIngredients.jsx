import {useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIngredientsBuns} from "./BurgerIngredientsBuns";
import {BurgerIngredientsSauce} from "./BurgerIngredientsSauce";
import {BurgerIngredientsFillings} from "./BurgerIngredientsFillings";

export const BurgerIngredients = () => {
    const [current, setCurrent] = useState('one')
    return (
        <>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    <BurgerIngredientsBuns />
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    <BurgerIngredientsSauce />
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    <BurgerIngredientsFillings />
                </Tab>
            </div>
        </>
    )
}