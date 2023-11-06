import styles from './burger-ingridients.module.css'
import {forwardRef, useState} from "react";
import {BurgerIngredientsItemType} from '../../utils/props-types'
import {useDispatch, useSelector} from "react-redux";
import {showIngredientInfo} from "../../services/selectors/current-ingredient-info";
import {showIngredientIfoModal} from "../../services/actions/current-ingredient";
import {BurgerIngredientsButton} from "./burger-ingredients-button";

export const BurgerIngredientsItem = forwardRef(({title, data}, ref) => {
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
                {data.length && (
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
                )}
            </div>
        </div>
    )
})

BurgerIngredientsItem.propTypes = BurgerIngredientsItemType