import {useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIngredientsItem} from "./BurgerIngredientsItem";

import ingridientsStyle from './BurgerIngredients.module.css'
import {data} from "../../utils/data";

export const BurgerIngredients = () => {
    const [current, setCurrent] = useState('one')

    return (
        <>
            <p className="text text_type_main-large mb-5">
                Соберите бургер
            </p>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={`${ingridientsStyle.ingredients_list} pt-6 pl-4 pr-4`}>
                <BurgerIngredientsItem
                    title='Булки'
                    data={data.filter((item) => item.type === 'bun' && item)}
                />
                <BurgerIngredientsItem
                    title='Соусы'
                    data={data.filter((item) => item.type === 'sauce' && item)}
                />
                <BurgerIngredientsItem
                    title='Начинки'
                    data={data.filter((item) => item.type === 'main' && item)}
                />
            </div>
        </>
    )
}