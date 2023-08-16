import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import {useContext, useEffect, useReducer, useState} from "react";
import {BurgerConstructorContext} from "../../services/burger-constructor-context";
import PropTypes from "prop-types";

export const BurgerConstructorList = ({setSum, setAllIngridients}) => {
    const data = useContext(BurgerConstructorContext)
    const [firstItem, setFirstItem] = useState(null)
    const [lastItem, setLastItem] = useState(null)
    const [price, setPrice] = useReducer(sumReducer, 0);
    function sumReducer(sum, action){
        if (action.type === 'countTotalPrice'){
            let totalSum = 0;
            totalSum += firstItem.price;
            totalSum += lastItem.price;
            data.forEach(item => {
                if (item.type !== 'bun') {
                    totalSum += item.price;
                }
            });
            return totalSum
        }
    }

    useEffect(() => {
        const buns = data.find(item => item.type === 'bun')
        if (buns) {
            setFirstItem({
                ...buns,
                name: buns.name + ' (верх)'
            })
            setLastItem({
                ...buns,
                name: buns.name + ' (низ)'
            })
        }
    }, [data])

    useEffect(() => {
        setPrice({type: 'countTotalPrice'})
        setSum(price)

        const arrayOfIdsItems = [firstItem?._id, lastItem?._id]
        data.forEach(item => {
            if (item.type !== 'bun') {
                arrayOfIdsItems.push(item._id)
            }
        });
        setAllIngridients([...arrayOfIdsItems])
    }, [data, firstItem, lastItem]);

    return (
        <div className={`${styles.general_burger_constructor} pt-25`}>
            {firstItem &&(
                <ConstructorElement
                    key={firstItem.name}
                    type="top"
                    isLocked={true}
                    text={firstItem.name}
                    price={firstItem.price}
                    thumbnail={firstItem.image_mobile}
                />
            )}
            <div className={styles.middle_burger_constructor}>
                {data?.length > 0 ?
                    data.map((item) => {
                        if (item.type !== 'bun') {
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
            {lastItem && (
                <ConstructorElement
                    key={lastItem.name}
                    type="bottom"
                    isLocked={true}
                    text={lastItem.name}
                    price={lastItem.price}
                    thumbnail={lastItem.image_mobile}
                />
            )}
        </div>
    )
}

BurgerConstructorList.propTypes = {
    setSum: PropTypes.func.isRequired,
    setAllIngridients:  PropTypes.func.isRequired
}