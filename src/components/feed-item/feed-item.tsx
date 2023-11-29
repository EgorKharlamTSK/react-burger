import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-item.module.css"
export const FeedItem = () => {
    const dateFromServer = '2022-10-10T17:33:32.877Z'
    return (
        <div className={`${styles.box} p-6`}>
            <div className={`${styles.titleBox} mb-6`}>
                <p className="text text_type_digits-default">
                    #32dsa
                </p>
                <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(dateFromServer)} />
            </div>
            <div className='mb-6'>
                <p className="text text_type_main-medium">
                    The quick brown fox jumps over the lazy dog.
                </p>
            </div>
            <div className={styles.currencyBox}>
                <div>
                    images
                </div>
                <div className={`${styles.pay} ml-6`}>
                    <p className="text text_type_digits-default">
                        480
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}