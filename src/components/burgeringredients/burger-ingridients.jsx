import {useEffect, useState} from "react";
import {BurgerIngridientsItem} from "./burger-ingridients-item";
import ingridientsStyle from './burger-ingridients.module.css'
import {BurgerIngridientsTabs} from "./burger-ingridients-tabs";
import {useSelector} from "react-redux";
import {getAllIngredients} from "../../services/selectors/burger-ingredients";
import { useInView } from 'react-intersection-observer';

export const BurgerIngridients = () => {
    const ingredientsData = useSelector(getAllIngredients)

    const [current, setCurrent] = useState('bun')
    const [buns, setBuns] = useState([])
    const [sauce, setSauce] = useState([])
    const [main, setMain] = useState([])

    const [refBun, inViewBun] = useInView({
        triggerOnce: false,
    });
    const [refSauce, inViewSauce] = useInView({
        triggerOnce: false,
    });
    const [refMain, inViewMain] = useInView({
        triggerOnce: false,
    });

    useEffect(() => {
        const sections = ['bun', 'sauce', 'main'];
        const inView = [inViewBun, inViewSauce, inViewMain];
        for (let i = 0; i < sections.length; i++) {
            if (inView[i]) {
                setCurrent(sections[i]);
                break;
            }
        }
    }, [inViewBun, inViewSauce, inViewMain]);

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
                    ref={refBun}
                />
                <BurgerIngridientsItem
                    title='Соусы'
                    data={sauce}
                    ref={refSauce}
                />
                <BurgerIngridientsItem
                    title='Начинки'
                    data={main}
                    ref={refMain}
                />
            </div>
        </div>
    )
}