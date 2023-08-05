import styles from './BurgerIngredients.module.css'
import tabStyle from "./BurgerIngredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import BurgerIngredientsItemType from '../../utils/props-types'
export const BurgerIngredientsItem = ({title, data}) => {
    const [count, setCounter] = useState(0)

    return (
        <div className={`${styles.card}`}>
            <p className="text text_type_main-medium mb-6">
                {title}
            </p>
            <div className={`${styles.ingredients_item}`}>
                {data.length > 0 ? (
                    (data?.map((item) => {
                        return <div className={`${tabStyle.tabItem} mt-6 mb-10`} key={item._id}>
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
                                <p className="text text_type_digits-default">
                                    {item.price}
                                </p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className={` ${tabStyle.text} text text_type_main-small mb-4`}>
                                {item.name}
                            </p>
                        </div>
                    }))
                ) : null}
            </div>
        </div>
    )
}

BurgerIngredientsItem.propTypes = BurgerIngredientsItemType