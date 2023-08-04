import styles from './BurgerIngredients.module.css'
import tabStyle from "./BurgerIngredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import PropTypes from "prop-types";
export const BurgerIngredientsItem = ({title, data}) => {
    const [count, setCounter] = useState(0)

    return (
        <div className={`${styles.card} pt-6 pb-10 pl-6 pr-6 mb-10`}>
            <p className="text text_type_main-medium mb-6">
                {title}
            </p>
            <div className={`${styles.ingredients_item}`}>
                {data && Array.isArray(data) ? (
                    (data?.map((item) => {
                        return <div className={`${tabStyle.tabItem} mb-8`} key={item._id}>
                            <button
                                key={item._id}
                                className={`${tabStyle.btn}`}
                                onClick={() => setCounter(count + 1)}
                            >
                                <img
                                    src={`${item.image}`}
                                    alt={item.name}
                                />
                                {count !== 0 && (
                                    <Counter count={count} />
                                )}
                            </button>
                            <div className={`${tabStyle.item_price} mt-1 mb-1`}>
                                <p className="text text_type_digits-default mr-2">
                                    {item.price}
                                </p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className={` ${tabStyle.text} text text_type_main-small`}>
                                {item.name}
                            </p>
                        </div>
                    }))
                ) : null}
            </div>
        </div>
    )
}

BurgerIngredientsItem.prototype = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    }).isRequired
}