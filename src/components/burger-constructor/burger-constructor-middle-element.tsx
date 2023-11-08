import styles from "./burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {FC, useRef} from "react";
import {useDispatch} from "react-redux";
import {reorderIngridients} from "../../services/actions/burger-constructor";
import {IBurgerConstructorMiddleElement} from "../../utils/types";

export const BurgerConstructorMiddleElement: FC<IBurgerConstructorMiddleElement> = ({ingredient, index, deleteIngredientFromFront}) => {
    const dispatch = useDispatch()
    const refIngredient = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop({
        accept: 'ingredientFromConstr',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: any, monitor) {
            if (!refIngredient.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = refIngredient.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            // @ts-ignore
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch(reorderIngridients(dragIndex, hoverIndex))

            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: "ingredientFromConstr",
        item: () => {
            return { ingredient, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(refIngredient))

    return (
        <div style={{opacity}} className={styles.middle_burger_constructor_item} ref={refIngredient}>
            <DragIcon
                type="primary"
            />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={() => deleteIngredientFromFront(ingredient)}
            />
        </div>
    )
}