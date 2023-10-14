import tabStyle from "./burger-ingridients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {hideIngredientIfoModal} from "../../services/actions/current-ingredient";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

export const BurgerIngredientsButton = ({isOpenModal, item, handleModal}) => {
    const dispatch = useDispatch()
    const counter = useSelector(state => state.constructorReducer.listOfCounterIngredients)
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "ingredient",
        item: item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    useEffect(() => {
        if (!isOpenModal){
            dispatch(hideIngredientIfoModal())
        }
    }, [isOpenModal]);

    const displayCountOfIngredient = (item) => {
        const findUsefulItem = Object.keys(counter).find(key => key === item._id)
        const value = findUsefulItem ? counter[findUsefulItem] : undefined
        return value
    }

    return (
        <div ref={dragRef} className={`${tabStyle.tabItem} mt-6 mb-10`} key={item.uniqId}>
            <button
                className={`${tabStyle.btn}`}
            >
                <img
                    src={`${item.image}`}
                    alt={item.name}
                    onClick={() => handleModal(item)}
                />
                {displayCountOfIngredient(item) > 0 ?
                    <Counter
                        count={displayCountOfIngredient(item)}
                    /> : <></>
                }
            </button>
            <div className={`${tabStyle.item_price} mt-1 mb-1`}>
                <p className="text text_type_digits-default">
                    {item.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={` ${tabStyle.text} text text_type_main-small mb-4`}>
                {item.name}
            </p>
        </div>
    )
}

BurgerIngredientsButton.propTypes = {
    isOpenModal: PropTypes.bool,
    item: PropTypes.object,
    handleModal: PropTypes.func
}