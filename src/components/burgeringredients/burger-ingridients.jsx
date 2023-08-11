import {useState} from "react";
import {BurgerIngridientsItem} from "./burger-ingridients-item";

import ingridientsStyle from './burger-ingridients.module.css'
// import {data} from "../../utils/data";
import {BurgerIngridientsTabs} from "./burger-ingridients-tabs";

export const BurgerIngridients = ({ingridientsData}) => {
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

    const[modalOpen, setModalOpen] = useState(false)

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