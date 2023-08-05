import {useState} from "react";
import {BurgerIngredientsItem} from "./BurgerIngredientsItem";

import ingridientsStyle from './BurgerIngredients.module.css'
import {data} from "../../utils/data";
import {BurgerIngredientsTabs} from "./BurgerIngredientsTabs";

export const BurgerIngredients = () => {
    const [current, setCurrent] = useState('bun')
    const [buns] = useState(
        data.filter((bunItem) => bunItem.type === 'bun')
    )
    const [sauce] = useState(
        data.filter((sauceItem) => sauceItem.type === 'sauce')
    )
    const [main] = useState(
        data.filter((mainItem) => mainItem.type === 'main')
    )

    return (
        <div>
            <p className="text text_type_main-large mb-5">
                Соберите бургер
            </p>
            <BurgerIngredientsTabs current={current} setCurrent={setCurrent}/>
            <div className={`${ingridientsStyle.ingredients_list}`}>
                <BurgerIngredientsItem
                    title='Булки'
                    data={buns}
                />
                <BurgerIngredientsItem
                    title='Соусы'
                    data={sauce}
                />
                <BurgerIngredientsItem
                    title='Начинки'
                    data={main}
                />
            </div>
        </div>
    )
}