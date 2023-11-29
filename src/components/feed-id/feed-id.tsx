import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-id.module.css"
export const FeedId = () => {
    const dateFromServer = '2022-10-10T17:33:32.877Z'

    return (
        <div className={styles.main}>
            <p className="text text_type_digits-medium mb-10">
                #034533
            </p>
            <p className="text text_type_main-medium mb-3">
                Black Hole Singularity острый бургер
            </p>
            <p className="text text_type_main-default mb-15">
                Выполнен
            </p>
            <p className="text text_type_main-medium mb-6">
                Состав:
            </p>
            <div className={`pt-4 pb-4`}>
                <div className={`mb-4`}>
                    <div>

                    </div>
                    <p className="text text_type_main-default">

                    </p>
                    <div>
                        <p className="text text_type_digits-default">

                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
            <div className={`${styles.footer}`}>
                <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(dateFromServer)} />
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