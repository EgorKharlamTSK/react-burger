import styles from './burger-ingridients.module.css'
import tabStyle from "./burger-ingridients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {BurgerIngredientsItemType} from '../../utils/props-types'
import {Modal} from "../modal/modal";
import {IngredientsModalTable} from "./ingredients-modal-table";

export const BurgerIngridientsItem = ({title, data}) => {
    const [count, setCounter] = useState(0)
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null)

    const handleModal = (item) => {
        setSelectedItem(item)
        setIsOpenModal(!isOpenModal);
    };

    return (
        <div className={`${styles.card}`}>
            <p className="text text_type_main-medium mb-6">
                {title}
            </p>
            <div className={`${styles.ingredients_item}`}>
                {data.length > 0 ? (
                    (data?.map((item) => {
                        return <div className={`${tabStyle.tabItem} mt-6 mb-10`} key={item._id}>
                            <button
                                key={item._id}
                                className={`${tabStyle.btn}`}
                                onClick={() => {
                                        setCounter(count + 1)
                                        handleModal(item)
                                    }
                                }
                            >
                                <img
                                    src={`${item.image}`}
                                    alt={item.name}
                                />
                                {count !== 0 && (
                                    <Counter count={count} />
                                )}
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
                    }))
                ) : null}
            </div>
            {isOpenModal && selectedItem && (
                <Modal closeModal={handleModal} title='Детали ингридиента'>
                    <img
                        className={`mt-15`}
                        src={`${selectedItem.image_large}`}
                        alt={selectedItem.name}
                    />
                    <p className="text text_type_main-medium mt-4 mb-8">
                        {selectedItem.name}
                    </p>
                    <IngredientsModalTable selectedItem={selectedItem} />
                </Modal>
            )}
        </div>
    )
}

BurgerIngridientsItem.propTypes = BurgerIngredientsItemType