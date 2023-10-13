import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import {useContext, useEffect, useReducer, useState} from "react";
import {BurgerConstructorContext} from "../../services/burger-constructor-context";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {getConstructorIngredients} from "../../services/selectors/burger-constructor";
import {addIngredient, checkSum, deleteIngredient} from "../../services/actions/burger-constructor";
import {useDrop} from "react-dnd";

export const BurgerConstructorList = () => {
    const dispatch = useDispatch()
    const data = useSelector(getConstructorIngredients)
    const [firstItem, setFirstItem] = useState(null)
    const [lastItem, setLastItem] = useState(null)

    const deleteIngredientFromFront = (ingredient) => {
        dispatch(deleteIngredient(ingredient))
    }

    useEffect(() => {
        dispatch(checkSum(data))
    }, [data, dispatch]);

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
                                key={item.uniqId}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                                handleClose={() => deleteIngredientFromFront(item)}
                                onClick={() => console.log('oke')}
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