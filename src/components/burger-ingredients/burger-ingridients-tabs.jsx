import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from './burger-ingridients.module.css'

export const BurgerIngredientsTabs = ({current, setCurrent}) => {

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

BurgerIngredientsTabs.propTypes = {
    current: PropTypes.string,
    setCurrent: PropTypes.func
}