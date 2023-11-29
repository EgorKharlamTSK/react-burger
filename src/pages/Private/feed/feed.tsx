import {FeedItem} from "../../../components/feed-item/feed-item";
import styles from "./feed.module.css"
import {FeedInfo} from "../../../components/feed-info/feed-info";
export const Feed = () => {
    return(
        <div className={`container mt-10`}>
            <p className="text text_type_main-large">
                Лента заказов
            </p>
            <div className={styles.main} >
                <div className={styles.feedItem}>
                    <FeedItem />
                </div>
                <div>
                    <FeedInfo />
                </div>
            </div>
        </div>
    )
}