import {BurgerConstructorList} from "./burger-constructor-list";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import {useState} from "react";
import { OrderDetailsModal} from "../modal/order-details";

export const BurgerConstructor = ({constructorData}) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [orderNumber, setOrderNumber] = useState(0)
    const handleModal = () => {
        setIsOpenModal(!isOpenModal);
        setOrderNumber(Math.floor(Math.random() * 100001))
    };

    return (
        <div className={`ml-10 pr-4`}>
            <BurgerConstructorList data={constructorData}/>
            <div className={`${styles.footer_constructor} mt-10`}>
                <div className={`${styles.price} mr-10`}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={handleModal} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {isOpenModal && (
                <OrderDetailsModal handleModal={handleModal} orderNumber={orderNumber} />
            )}
        </div>
    )
}