import {BurgerConstructorList} from "./burger-constructor-list";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import {useState} from "react";
import { OrderDetailsModal} from "../modal/order-details";
import {useDispatch, useSelector} from "react-redux";
import {getConstructorIngredients, getSumOfOrder} from "../../services/selectors/burger-constructor";
import {getOrders} from "../../services/actions/order";
import {addIngredient} from "../../services/actions/burger-constructor";
import {useDrop} from "react-dnd";

export const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const sum = useSelector(getSumOfOrder)
    const ingredientFromConstructor = useSelector(getConstructorIngredients)
    const allIngredients = useSelector(getConstructorIngredients)
    const [isOpenModal, setIsOpenModal] = useState(false);
    const handleModal = async () => {
        if(allIngredients.length > 0) {
            dispatch(getOrders(allIngredients))
        }
        setIsOpenModal(!isOpenModal);
    };

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            handleDrop(item)
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const handleDrop = (item) => {
        dispatch(addIngredient(item))
    };


    return (
        <div className={`ml-10 pr-4`} ref={dropTarget}>
            <BurgerConstructorList />
            <div className={`${styles.footer_constructor} mt-10`}>
                <div className={`${styles.price} mr-10`}>
                    <p className="text text_type_digits-medium">{sum}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button disabled={ingredientFromConstructor.length > 0 ? false : true} onClick={handleModal} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {isOpenModal && (
                <OrderDetailsModal handleModal={handleModal} />
            )}
        </div>
    )
}