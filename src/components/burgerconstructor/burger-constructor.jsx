import {BurgerConstructorList} from "./burger-constructor-list";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import {useEffect, useState} from "react";
import { OrderDetailsModal} from "../modal/order-details";
import {getOrders} from "../../utils/api";
import {OrderNumberContext} from "../../services/burger-constructor-context";

export const BurgerConstructor = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [orderNumber, setOrderNumber] = useState(0)
    const [sum, setSum] = useState(0)
    const [orderData, setOrderData] = useState({})
    const [orderDataIsLoading, setOrderDataIsLoading] = useState(true)
    const [allIngridients, setAllIngridients] = useState([])

    const handleModal = async () => {
        if(allIngridients.length > 0) {
            await getOrders(allIngridients)
                .then(setOrderData)
                .catch(er => console.log("Ошибка загрузки данных " + er))
                .finally(() => setOrderDataIsLoading(false))
        }
        setIsOpenModal(!isOpenModal);
    };

    useEffect(() => {
        setOrderNumber(orderData?.order?.number)
    }, [orderData]);

    return (
        <div className={`ml-10 pr-4`}>
            <BurgerConstructorList setSum={setSum} setAllIngridients={setAllIngridients}/>
            <div className={`${styles.footer_constructor} mt-10`}>
                <div className={`${styles.price} mr-10`}>
                    <p className="text text_type_digits-medium">{sum}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={handleModal} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {isOpenModal && (
                <OrderNumberContext.Provider value={orderNumber} >
                    <OrderDetailsModal handleModal={handleModal} />
                </OrderNumberContext.Provider>
            )}
        </div>
    )
}