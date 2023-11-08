import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingridients.module.css'
import {FC, SetStateAction} from "react";

interface IBurgerIngredientsTabs {
    current: string
    setCurrent: (value: string) => void
}

export const BurgerIngredientsTabs: FC<IBurgerIngredientsTabs>  = ({current, setCurrent}) => {

    return(
        <div className={`${styles.ingredients_tabs} mb-10`}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}