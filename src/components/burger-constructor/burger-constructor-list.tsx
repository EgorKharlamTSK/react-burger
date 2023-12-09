import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import {useEffect, useMemo, useState} from "react";
import {getConstructorIngredients} from "../../services/selectors/burger-constructor";
import {addIngredient, checkSum, deleteIngredient, ingredientsCounter} from "../../services/actions/burger-constructor";
import {useDrop} from "react-dnd";
import {BurgerConstructorMiddleElement} from "./burger-constructor-middle-element";
import {IBurgerItemData} from "../../utils/types";
import {useDispatch} from "../../services/hooks/use-dispatch";
import {useSelector} from "../../services/hooks/use-selector";

export const BurgerConstructorList = () => {
    const dispatch = useDispatch()
    const ingredientsFromConstructor = useSelector(getConstructorIngredients)
    const ingredientCounts = useMemo(() => ingredientsFromConstructor.reduce((acc: { [x: string]: number; },item: { _id: string | number; }) => ({...acc, [item._id]: (+acc[item._id] || 0) + 1}), {}), [ingredientsFromConstructor]);    const [firstItem, setFirstItem] = useState<IBurgerItemData>()
    const [lastItem, setLastItem] = useState<IBurgerItemData>()

    useEffect(() => {
        dispatch(checkSum(ingredientsFromConstructor))
    }, [ingredientsFromConstructor, dispatch]);

    useEffect(() => {
        dispatch(ingredientsCounter(ingredientCounts))
    }, [ingredientCounts, dispatch]);

    useEffect(() => {
        const buns = ingredientsFromConstructor.find((item: IBurgerItemData) => item.type === 'bun')
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
    }, [ingredientsFromConstructor])

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: IBurgerItemData) {
            handleDrop(item)
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const handleDrop = (item: IBurgerItemData) => {
        const bunsInData = ingredientsFromConstructor.filter((i: IBurgerItemData) => i.type === 'bun')
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

    const deleteIngredientFromFront = (ingredient: IBurgerItemData) => {
        dispatch(deleteIngredient(ingredient))
    }

    return (
        <div className={`${styles.general_burger_constructor} pt-25`} ref={dropTarget} data-cy="constructor">
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
                {ingredientsFromConstructor?.length > 0 ?
                    ingredientsFromConstructor.map((item, index: number) => {
                        const currentItem = item;
                        if (currentItem.type !== 'bun') {
                            return <BurgerConstructorMiddleElement key={currentItem.uniqId} index={index}  ingredient={currentItem} deleteIngredientFromFront={deleteIngredientFromFront}/>
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