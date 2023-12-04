import {Modal} from "./modal";
import {useNavigate, useParams} from "react-router-dom";
import {FeedId} from "../feed-id/feed-id";
import {useDispatch} from "../../services/hooks/use-dispatch";
import {useSelector} from "../../services/hooks/use-selector";
import {useEffect, useState} from "react";
import {IOrders} from "../../utils/types";
import {findSpecOrder} from "../../services/actions/specific-order-feed";


export const FeedIdModal = () => {
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
        console.log(specOrder)
    }, [specOrder]);

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
                <FeedId data={currentFeedItem} />
            }
        </Modal>
    )
}