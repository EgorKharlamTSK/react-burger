import tabStyle from "./burger-ingridients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";

export const BurgerIngredientsButton = ({isOpenModal, item, handleModal}) => {
    const dispatch = useDispatch()
    let location = useLocation();
    const counter = useSelector(state => state.constructorReducer.listOfCounterIngredients)
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "ingredient",
        item: item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    const displayCountOfIngredient = (item) => {
        const findUsefulItem = Object.keys(counter).find(key => key === item._id)
        const value = findUsefulItem ? counter[findUsefulItem] : undefined
        return value
    }

    return (
        <div ref={dragRef} className={`${tabStyle.tabItem} mt-6 mb-10`} key={item.uniqId}>
            <Link
                to={`/ingredients/${item._id}`}
                state={{ backgroundLocation: location }}
                className={`${tabStyle.btn}`}
            >
                <img
                    src={`${item.image}`}
                    alt={item.name}
                    onClick={() => handleModal(item)}
                />
                {displayCountOfIngredient(item) > 0 ?
                    <Counter count={displayCountOfIngredient(item)} /> : <></>
                }
            </Link>
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