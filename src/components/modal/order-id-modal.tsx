import {Modal} from "./modal";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "../../services/hooks/use-dispatch";
import {useSelector} from "../../services/hooks/use-selector";
import {useEffect, useState} from "react";
import {IOrders} from "../../utils/types";
import {findSpecOrder} from "../../services/actions/specific-order-feed";
import {OrdersId} from "../orders-id/orders-id";


export const OrderIdModal = () => {
    const dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate();
    const { number } = params;
    const specOrder = useSelector(state => state.specOrderFeed.specOrder?.orders)
    const [specOrderFront, setSpecOrderFront] = useState(specOrder)
    const [currentFeedItem, setCurrentFeedItem] = useState<IOrders>()

    useEffect(() => {
        dispatch(findSpecOrder(number))
    }, [dispatch]);

    useEffect(() => {
        if (specOrder) {
            setCurrentFeedItem(specOrder[0]);
        }
    }, [specOrder]);

    const handleCloseModal = () => {
        navigate(-1);
    }
    return (
        <Modal closeModal={handleCloseModal} title="">
            {typeof currentFeedItem !== "undefined" && currentFeedItem &&
                <OrdersId data={currentFeedItem} />
            }
        </Modal>
    )
}