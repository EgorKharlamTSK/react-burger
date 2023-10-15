import {useEffect, useMemo, useState} from "react";
import {BurgerIngredientsItem} from "./burger-ingridients-item";
import ingredientsStyle from './burger-ingridients.module.css'
import {BurgerIngredientsTabs} from "./burger-ingridients-tabs";
import {useSelector} from "react-redux";
import {getAllIngredients} from "../../services/selectors/burger-ingredients";
import { useInView } from 'react-intersection-observer';

export const BurgerIngredients = () => {
    const ingredientsData = useSelector(getAllIngredients)

    const [current, setCurrent] = useState('bun')

    const buns = useMemo(() => ingredientsData ? ingredientsData.filter(bunItem => bunItem.type === 'bun') : [], [ingredientsData]);
    const sauce = useMemo(() => ingredientsData ? ingredientsData.filter(sauceItem => sauceItem.type === 'sauce') : [], [ingredientsData]);
    const main = useMemo(() => ingredientsData ? ingredientsData.filter(mainItem => mainItem.type === 'main') : [], [ingredientsData]);

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
        const inViewIndex = inView.findIndex(isVisible => isVisible)
        if (inViewIndex !== -1) setCurrent(sections[inViewIndex])
    }, [inViewBun, inViewSauce, inViewMain]);

    return (
        <div>
            <p className="text text_type_main-large mb-5">
                Соберите бургер
            </p>
            <BurgerIngredientsTabs current={current} setCurrent={setCurrent}/>
            <div className={`${ingredientsStyle.ingredients_list}`}>
                <BurgerIngredientsItem
                    title='Булки'
                    data={buns}
                    ref={refBun}
                />
                <BurgerIngredientsItem
                    title='Соусы'
                    data={sauce}
                    ref={refSauce}
                />
                <BurgerIngredientsItem
                    title='Начинки'
                    data={main}
                    ref={refMain}
                />
            </div>
        </div>
    )
}