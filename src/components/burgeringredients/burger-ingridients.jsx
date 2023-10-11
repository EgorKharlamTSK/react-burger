import {useEffect, useState} from "react";
import {BurgerIngridientsItem} from "./burger-ingridients-item";
import ingridientsStyle from './burger-ingridients.module.css'
import {BurgerIngridientsTabs} from "./burger-ingridients-tabs";
import {useDispatch, useSelector} from "react-redux";
import {getAllIngredients} from "../../services/selectors/burger-ingredients";
import {addIngredient} from "../../services/actions/burger-constructor";

export const BurgerIngridients = () => {
    const dispatch = useDispatch()
    const ingredientsData = useSelector(getAllIngredients)

    const [current, setCurrent] = useState('bun')
    const [buns, setBuns] = useState([])
    const [sauce, setSauce] = useState([])
    const [main, setMain] = useState([])

    useEffect(() => {
        if (ingredientsData) {
            setBuns(ingredientsData.filter((bunItem) => bunItem.type === 'bun'))
            setSauce(ingredientsData.filter((sauceItem) => sauceItem.type === 'sauce'))
            setMain(ingredientsData.filter((mainItem) => mainItem.type === 'main'))
        }
    }, [ingredientsData])

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