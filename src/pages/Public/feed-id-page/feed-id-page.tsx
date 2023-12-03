import {useParams} from "react-router-dom";
import styles from "../../../components/burger-ingredients/burger-ingridients.module.css";
import {FeedId} from "../../../components/feed-id/feed-id";
import {useSelector} from "../../../services/hooks/use-selector";
import {useEffect, useState} from "react";
import {IOrders, IWsFeedsItem} from "../../../utils/types";
import {fintSpecOrder} from "../../../services/actions/specific-order-feed";
import {useDispatch} from "../../../services/hooks/use-dispatch";

export const FeedIdPage = () => {
    const dispatch = useDispatch()
    const params = useParams();
    const number = params.number
    const specOrder = useSelector(state => state.specOrderFeed.specOrder?.orders)
    const [currentFeedItem, setCurrentFeedItem] = useState<IOrders | undefined>()

    useEffect(() => {
        if (specOrder) {
            const usefulFeed = specOrder.find((item: any) => {
                return item.number === number
            })
            setCurrentFeedItem(specOrder[0])
        }
    }, [specOrder]);

    useEffect(() => {
        dispatch(fintSpecOrder(number))
    }, [dispatch]);

    return (
        <div className={styles.ingredient_parent_page}>
            <div className={styles.ingredient_on_page}>
                {typeof currentFeedItem !== "undefined" && currentFeedItem &&
                    <FeedId data={currentFeedItem}/>
                }
            </div>
        </div>
    )
}