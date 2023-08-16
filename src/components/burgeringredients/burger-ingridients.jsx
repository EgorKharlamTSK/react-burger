import {useContext, useState} from "react";
import {BurgerIngridientsItem} from "./burger-ingridients-item";

import ingridientsStyle from './burger-ingridients.module.css'
import {BurgerIngridientsTabs} from "./burger-ingridients-tabs";
import {BurgerConstructorContext} from "../../services/burger-constructor-context";

export const BurgerIngridients = () => {
    const ingridientsData = useContext(BurgerConstructorContext)
    const [current, setCurrent] = useState('bun')
    const [buns] = useState(
        ingridientsData.filter((bunItem) => bunItem.type === 'bun')
    )
    const [sauce] = useState(
        ingridientsData.filter((sauceItem) => sauceItem.type === 'sauce')
    )
    const [main] = useState(
        ingridientsData.filter((mainItem) => mainItem.type === 'main')
    )

    return (
        <div>
            <p className="text text_type_main-large mb-5">
                Соберите бургер
            </p>
            <BurgerIngridientsTabs current={current} setCurrent={setCurrent}/>
            <div className={`${ingridientsStyle.ingredients_list}`}>
                <BurgerIngridientsItem
                    title='Булки'
                    data={buns}
                />
                <BurgerIngridientsItem
                    title='Соусы'
                    data={sauce}
                />
                <BurgerIngridientsItem
                    title='Начинки'
                    data={main}
                />
            </div>
        </div>
    )
}