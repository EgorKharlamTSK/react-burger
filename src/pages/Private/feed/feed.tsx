import {FeedItem} from "../../../components/feed-item/feed-item";
import styles from "./feed.module.css"
import {FeedInfo} from "../../../components/feed-info/feed-info";
import {connect as connectWS, disconnect as disConnectWS} from "../../../services/actions/ws-actions";
import {useDispatch} from "../../../services/hooks/use-dispatch";
import {useEffect, useState} from "react";
import { IWsFeedsItem} from "../../../utils/types";
import {useSelector} from "../../../services/hooks/use-selector";

const FEED_URL = "wss://norma.nomoreparties.space/orders/all"

export const Feed = () => {
    const dispatch = useDispatch()
    const [allFeedsFromBack, setAllFeedsFromBack] = useState<IWsFeedsItem[] | undefined>()
    const allFeeds = useSelector(state => state.wsFeeds.orders)

    const connect = () => dispatch(connectWS(FEED_URL))
    const disconnect = () => dispatch(disConnectWS())

    useEffect(() => {
        connect()
    }, []);

    useEffect(() => {
        if (allFeeds) {
            setAllFeedsFromBack(allFeeds.orders)
        }
    }, [allFeeds]);

    useEffect(() => {
        return () => {
            disconnect()
        }
    }, []);

    return(
        <div className={`container mt-10`}>
            <p className="text text_type_main-large">
                Лента заказов
            </p>
            <div className={styles.main} >
                <div className={styles.feedItem}>
                    {typeof allFeedsFromBack !== "undefined" && allFeedsFromBack?.length > 0 ?
                        allFeedsFromBack?.map((item: IWsFeedsItem) => {
                            return <FeedItem
                                key={item.number}
                                data={item}
                            />
                        }) : <p>Идет загрузка</p>
                    }
                </div>
                <div>
                    {allFeeds ?
                        <FeedInfo
                            data={allFeeds}
                        />
                        : <p>Идет загрузка статистики</p>
                    }
                </div>
            </div>
        </div>
    )
}