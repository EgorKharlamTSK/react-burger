import styles from './burger-ingridients.module.css'
import {ForwardedRef, forwardRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showIngredientInfo} from "../../services/selectors/current-ingredient-info";
import {showIngredientInfoModal} from "../../services/actions/current-ingredient";
import {BurgerIngredientsButton} from "./burger-ingredients-button";
import {IBurgerIngredientsItemType, IBurgerItemData} from "../../utils/types";

interface IBurgerIngredientsItemProps extends IBurgerIngredientsItemType {
    ref: ForwardedRef<HTMLDivElement>;
}

export const BurgerIngredientsItem = forwardRef<HTMLDivElement, IBurgerIngredientsItemProps>(({title, data}, ref) => {
    const dispatch = useDispatch()
    const selectedItem = useSelector(showIngredientInfo)
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedItem1, setSelectedItem] = useState<IBurgerItemData>()
    const handleModal = (item: IBurgerItemData) => {
        dispatch(showIngredientInfoModal(item))
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
                    (data?.map((item: IBurgerItemData) => {
                        return <BurgerIngredientsButton
                            key={item._id}
                            item={item}
                            handleModal={handleModal}
                            isOpenModal={isOpenModal}
                        />
                    }))
                )}
            </div>
        </div>
    )
})