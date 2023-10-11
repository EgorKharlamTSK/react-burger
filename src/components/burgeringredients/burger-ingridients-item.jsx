import styles from './burger-ingridients.module.css'
import tabStyle from "./burger-ingridients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import {BurgerIngredientsItemType} from '../../utils/props-types'
import {IngredientDetailsModal} from "../modal/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient} from "../../services/actions/burger-constructor";
import {showIngredientInfo} from "../../services/selectors/current-ingredient-info";
import {hideIngredientIfoModal, showIngredientIfoModal} from "../../services/actions/current-ingredient";

export const BurgerIngridientsItem = ({title, data}) => {
    const dispatch = useDispatch()
    const selectedItem = useSelector(showIngredientInfo)
    const [count, setCounter] = useState(0)
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedItem1, setSelectedItem] = useState(null)
    const handleModal = (item) => {
        dispatch(showIngredientIfoModal(item))
        setSelectedItem(item)
        setIsOpenModal(!isOpenModal);
    };

    useEffect(() => {
        if (!isOpenModal){
            dispatch(hideIngredientIfoModal())
        }
    }, [isOpenModal]);

    const addIngredientToConstruct = (ingredient) => {
        dispatch(addIngredient(ingredient))
    }

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
                                // onClick={() => {
                                //         setCounter(count + 1)
                                //         handleModal(item)
                                //     }
                                // }
                                onClick={() => addIngredientToConstruct(item)}
                            >
                                <img
                                    src={`${item.image}`}
                                    alt={item.name}
                                    onClick={() => handleModal(item)}
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
            {isOpenModal && selectedItem && (
                <IngredientDetailsModal
                    handleModal={handleModal}
                    selectedItem={selectedItem1}
                />
            )}
        </div>
    )
}

BurgerIngridientsItem.propTypes = BurgerIngredientsItemType