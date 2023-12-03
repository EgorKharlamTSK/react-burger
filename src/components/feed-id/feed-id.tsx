import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-id.module.css"
import {IBurgerItemData, IOrders, ISpecOrder, ISpecs, IWsFeed, IWsFeedsItem} from "../../utils/types";
import {FC, useEffect, useState} from "react";
import {useSelector} from "../../services/hooks/use-selector";
import {getAllIngredients} from "../../services/selectors/burger-ingredients";

export const checkStatus = (status: string) => {
    if (status === "done") {
        return "Выполнен"
    } else {
        return "В процессе"
    }
}

interface IData {
    data: IOrders | IWsFeedsItem
}
export const FeedId:FC<IData> = ({data}) => {
    const allIngredients = useSelector(getAllIngredients)
    const [allIngredForFeed, setAllIngredForFeed] = useState(allIngredients)
    const [price, setPrice] = useState<number>()
    const [needsIngredient, setNeedsIngredient] = useState<Array<IBurgerItemData>>()
    const [arrayOfImages, setArrayOfImages] = useState<Array<string>>()

    useEffect(() => {
        let resultArray:Array<any> = [];
        function compareAndCollectImages( allIngredients: IBurgerItemData[]) {
            data.ingredients.forEach((ingredientId: string) => {
                let ingredient = allIngredients.find((ing: any) => ing._id === ingredientId);
                if (ingredient) {
                    resultArray.push(ingredient);
                }
            });
        }

        function getUniqueIngredients(data: IOrders | IWsFeedsItem, allIngredients: any[]) {
            const ingredientCount = {} as {
                [key: string]: number;
            };
            data.ingredients.forEach((id) => {
                const ingredient = allIngredients.find((item) => item._id === id);
                if (ingredient) {
                    if (ingredientCount[ingredient._id]) {
                        ingredientCount[ingredient._id]++;
                    } else {
                        ingredientCount[ingredient._id] = 1;
                    }
                }
            });
            const uniqueIngredients = Object.keys(ingredientCount).map((id) => {
                const ingredient = allIngredients.find((item) => item._id === id);
                return {
                    ...ingredient,
                    count: ingredientCount[id],
                };
            });

            return uniqueIngredients;
        }
        const uniqueIngredients = getUniqueIngredients(data, allIngredients);
        setNeedsIngredient(uniqueIngredients)

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
        <div className={styles.main}>
            <p className={`text text_type_digits-default mb-10 ${styles.title}`}>
                #{data.number}
            </p>
            <p className="text text_type_main-medium mb-3">
                {data.name}
            </p>
            <p className={`${styles.status} text text_type_main-default mb-15`}>
                {checkStatus(data.status)}
            </p>
            <p className="text text_type_main-medium mb-6">
                Состав:
            </p>
            <div className={`pt-4 pb-4 ${styles.ingrBox}`}>
                {needsIngredient ? (
                        needsIngredient.map((item) => {
                            return (
                                <div key={item._id} className={`mb-4 ${styles.itemIngred}`}>
                                    <div className={styles.titleAndImage}>
                                        <span className={styles.imageBox} style={{backgroundImage: `url(${item.image_mobile})`}}>
                                          <span className={styles.image}> </span>
                                        </span>
                                        <p className="text text_type_main-default"> {item.name} </p>
                                    </div>
                                    <div className={styles.priceBoxItem}>
                                        <p className="text text_type_digits-default"> {item.count} </p>
                                        <span> X </span>
                                        <p className="text text_type_digits-default"> {item.price} </p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            );
                        })
                    ) :
                    <p>Идет загрузка ингредиентов</p>
                }
            </div>

            <div className={`${styles.footer}`}>
                <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(data.createdAt)} />
                <div className={`${styles.pay} ml-6`}>
                    <p className="text text_type_digits-default">
                        {price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}