import styles from "./order-item.module.css"
import {Link, useLocation} from "react-router-dom";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC, useEffect, useState} from "react";
import {IBurgerItemData, IWsFeedsItem} from "../../utils/types";
import {useSelector} from "../../services/hooks/use-selector";
import {getAllIngredients} from "../../services/selectors/burger-ingredients";
import {checkStatus} from "../feed-id/feed-id";

interface IData {
    data: IWsFeedsItem
}
export const OrderItem:FC<IData> = ({data}) => {
    const allIngredients = useSelector(getAllIngredients)
    let location = useLocation();
    const [arrayOfImages, setArrayOfImages] = useState<Array<string>>()
    const [allIngredForFeed, setAllIngredForFeed] = useState(allIngredients)
    const [price, setPrice] = useState<number>()

    useEffect(() => {
        let resultArray:Array<any> = [];
        function compareAndCollectImages( allIngredients: IBurgerItemData[]) {
            data.ingredients.forEach((ingredientId: string) => {
                let ingredient = allIngredients.find((ing: any) => ing._id === ingredientId);
                if (ingredient) {
                    resultArray.push(ingredient.image);
                }
            });
        }

        function calculateTotalPrice(allIngredients: IBurgerItemData[]) {
            let totalPrice = 0;
            data.ingredients.forEach(ingredientId => {
                let ingredient = allIngredients.find(ing => ing._id === ingredientId);
                if (ingredient) {
                    totalPrice += ingredient.price;
                }
            });
            setPrice(totalPrice)
        }
        calculateTotalPrice(allIngredients);
        compareAndCollectImages(allIngredForFeed)
        setArrayOfImages(resultArray)
    }, [allIngredients, allIngredForFeed]);

    return (
        <div className={`${styles.box} p-6 mb-4`}>
            <Link
                className={`${styles.link}`}
                to={`/orders/${data.number}`}
                state={{ backgroundLocation: location }}
            >
                <div className={`${styles.titleBox} mb-6`}>
                    <p className="text text_type_digits-default">
                        {data.number}
                    </p>
                    <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(data.updatedAt)} />
                </div>
                <div className='mb-6'>
                    <p className="text text_type_main-medium">
                        {data.name}
                    </p>
                    <p className={`text text_type_main-default ${styles.status}`}>
                        {checkStatus(data.status)}
                    </p>
                </div>
                <div className={styles.currencyBox}>
                    <div className={styles.imageBox}>
                        {typeof arrayOfImages !== "undefined" && arrayOfImages?.length > 0 ? (
                            arrayOfImages?.map((img: string, index: number) => {
                                if (index < 5) {
                                    return <span style={{backgroundImage: `url(${img})`}} key={data._id + img + index}>
                                            <span  className={styles.image}>
                                        </span>
                                        </span>
                                } else if (index === 5) {
                                    const remainingCount = arrayOfImages.length - 5;
                                    return (
                                        <span style={{backgroundImage: `url(${img})`}} className={styles.remaining} key={data._id + img + index}>
                                                <span className={styles.remaining}>
                                                    <span>
                                                        +{remainingCount}
                                                    </span>
                                                </span>
                                            </span>
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <span>Идет загрузка изображений</span>
                        )}
                    </div>
                    <div className={`${styles.pay} ml-6`}>
                        <p className="text text_type_digits-default">
                            {price}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link>
        </div>
    )
}