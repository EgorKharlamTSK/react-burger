import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getConstructorIngredients} from "../../services/selectors/burger-constructor";
import {addIngredient, checkSum, deleteIngredient, ingredientsCounter} from "../../services/actions/burger-constructor";
import {useDrop} from "react-dnd";
import {BurgerConstructorMiddleElement} from "./burger-constructor-middle-element";
import update from 'immutability-helper'

export const BurgerConstructorList = () => {
    const dispatch = useDispatch()
    const data = useSelector(getConstructorIngredients)
    const ingredientCounts = data.reduce((acc, item) => ({...acc, [item._id]: (acc[item._id] || 0) + 1}), [])

    const [firstItem, setFirstItem] = useState(null)
    const [lastItem, setLastItem] = useState(null)
    const [cards, setCards] = useState(null)

    useEffect(() => {
        dispatch(checkSum(data))
    }, [data, dispatch]);

    useEffect(() => {
        dispatch(ingredientsCounter(ingredientCounts))
    }, [ingredientCounts, dispatch]);

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

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            handleDrop(item)
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const handleDrop = (item) => {
        const bunsInData = data.filter(i => i.type === 'bun')
        const removeCurrentBunsAndAddNew = () => {
            dispatch(deleteIngredient(bunsInData[0]))
            dispatch(deleteIngredient(bunsInData[1]))
            dispatch(addIngredient(item))
            dispatch(addIngredient(item))
        }
        if (item.type === 'bun') {
            if (bunsInData.length === 0) {
                dispatch(addIngredient(item));
                dispatch(addIngredient(item));
            } else if (bunsInData[0]._id !== item._id) {
                removeCurrentBunsAndAddNew();
            } else if (bunsInData.length === 1) {
                dispatch(addIngredient(item));
            }
        } else {
            dispatch(addIngredient(item));
        }
    }

    const deleteIngredientFromFront = (ingredient) => {
        dispatch(deleteIngredient(ingredient))
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )
    }, [])

    return (
        <div className={`${styles.general_burger_constructor} pt-25`} ref={dropTarget}>
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
            <div className={styles.middle_burger_constructor} ref={dropTarget}>
                {data?.length > 0 ?
                    data.map((item) => {
                        if (item.type !== 'bun') {
                            return <BurgerConstructorMiddleElement item={item} moveCard={moveCard} deleteIngredientFromFront={deleteIngredientFromFront}/>
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