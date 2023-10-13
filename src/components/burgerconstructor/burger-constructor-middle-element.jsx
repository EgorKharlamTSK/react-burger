import styles from "./burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {useRef} from "react";

export const BurgerConstructorMiddleElement = ({item, moveCard, deleteIngredientFromFront}) => {
    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: 'ingredientFromMiddle',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.uniqId
            const hoverIndex = item._id
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: "ingredientFromMiddle",
        item: () => {

            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <div key={item.uniqId} className={styles.middle_burger_constructor_item} ref={ref}>
            <DragIcon
                type="primary"
                onClick={()=> console.log("e")}
            />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                handleClose={() => deleteIngredientFromFront(item)}
            />
        </div>
    )
}