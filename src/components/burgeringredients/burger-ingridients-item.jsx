import styles from './burger-ingridients.module.css'
import tabStyle from "./burger-ingridients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {forwardRef, useCallback, useEffect, useState} from "react";
import {BurgerIngredientsItemType} from '../../utils/props-types'
import {IngredientDetailsModal} from "../modal/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient} from "../../services/actions/burger-constructor";
import {showIngredientInfo} from "../../services/selectors/current-ingredient-info";
import {hideIngredientIfoModal, showIngredientIfoModal} from "../../services/actions/current-ingredient";
import {useDrag} from "react-dnd";
import {BurgerIngredientsButton} from "./burger-ingredients-button";

export const BurgerIngridientsItem = forwardRef(({title, data}, ref) => {
    const dispatch = useDispatch()
    const selectedItem = useSelector(showIngredientInfo)
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedItem1, setSelectedItem] = useState(null)
    const handleModal = (item) => {
        dispatch(showIngredientIfoModal(item))
        setSelectedItem(item)
        setIsOpenModal(!isOpenModal);
    };
    return (
        <div className={`${styles.card}`} ref={ref}>
            <p className="text text_type_main-medium mb-6">
                {title}
            </p>
            <div className={`${styles.ingredients_item}`}>
                {data.length > 0 ? (
                    (data?.map((item) => {
                        return <BurgerIngredientsButton
                            key={item._id}
                            item={item}
                            setSelectedItem={setSelectedItem}
                            setIsOpenModal={setIsOpenModal}
                            handleModal={handleModal}
                            isOpenModal={isOpenModal}
                        />
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
})

BurgerIngridientsItem.propTypes = BurgerIngredientsItemType