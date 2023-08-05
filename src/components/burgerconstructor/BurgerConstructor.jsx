import {BurgerConstructorList} from "./BurgerConstructorList";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './BurgerConstructor.module.css'
export const BurgerConstructor = () => {
    return (
        <div className={`ml-10 pr-4`}>
            <BurgerConstructorList />
            <div className={`${styles.footer_constructor} mt-10`}>
                <div className={`${styles.price} mr-10`}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}