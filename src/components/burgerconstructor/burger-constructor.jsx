import {BurgerConstructorList} from "./burger-constructor-list";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import orderComplete from '../../images/done.png'
import styles from './burger-constructor.module.css'
import {Modal} from "../modal/modal";
import {useState} from "react";

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
                <Modal closeModal={handleModal}>
                    <p className="text text_type_digits-large mt-20 mb-8">
                        {orderNumber}
                    </p>
                    <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
                    <img src={orderComplete} alt="orderComplete"/>
                    <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default mb-20">Дождитесь готовности на орбитальной станции</p>
                </Modal>
            )}
        </div>
    )
}