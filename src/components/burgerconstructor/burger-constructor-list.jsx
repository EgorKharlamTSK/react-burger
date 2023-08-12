import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'

export const BurgerConstructorList = ({data}) => {
    const firstItem = data.shift()
    const lastItem = data[data.length - 1]

    return (
        <div className={`${styles.general_burger_constructor} pt-25`}>
            <ConstructorElement
                key={firstItem._id}
                type="top"
                isLocked={true}
                text={firstItem.name}
                price={firstItem.price}
                thumbnail={firstItem.image_mobile}
            />
            <div className={styles.middle_burger_constructor}>
                {data?.length > 0 ?
                    data.map((item) => {
                        if(item !== firstItem && item !== lastItem){
                            return <ConstructorElement
                                key={item._id}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                            />
                        }
                    }) : null
                }
            </div>

            <ConstructorElement
                key={lastItem._id}
                type="bottom"
                isLocked={true}
                text={lastItem.name}
                price={lastItem.price}
                thumbnail={lastItem.image_mobile}
            />
        </div>
    )
}