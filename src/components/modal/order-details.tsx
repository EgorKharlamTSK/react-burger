import {Modal} from "./modal";
import orderComplete from "../../images/done.png";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {FC, useEffect, useState} from "react";
import {IOrderDetailsModal} from "../../utils/types";

export const OrderDetailsModal:FC<IOrderDetailsModal> = ({handleModal}) => {
    const data = useSelector((state:any) => state.orderInfo)
    const [orderNumber, setOrderNumber] = useState()

    useEffect(() => {
        if (data?.orderInfo?.order?.number) {
            setOrderNumber(data.orderInfo.order.number)
        }
    }, [data, handleModal]);

    return(
        <Modal closeModal={handleModal}>
            <p className="text text_type_digits-large mt-20 mb-8">
                {orderNumber}
            </p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <img src={orderComplete} alt="orderComplete"/>
            <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default mb-20">Дождитесь готовности на орбитальной станции</p>
        </Modal>
    )
}