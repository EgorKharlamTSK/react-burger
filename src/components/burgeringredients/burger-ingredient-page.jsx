import {IngredientsModalTable} from "./ingredients-modal-table";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAllIngredients} from "../../services/selectors/burger-ingredients";
import styles from "./burger-ingridients.module.css"

export const BurgerIngredientPage = () => {
    const params = useParams()
    const ingredientId = params.id
    const ingredientsData = useSelector(getAllIngredients)
    const [curIngredient, setCurIngredient] = useState()

    const searchWatchIngredient = () => {
        const usefulIngr = ingredientsData.filter((item) => {
            return item._id === ingredientId
        })
        setCurIngredient(usefulIngr[0])
    }

    useEffect(() => {
        searchWatchIngredient()
    }, [ingredientsData]);

    return (
        <div className={styles.ingredient_parent_page}>
            <div className={styles.ingredient_on_page}>
                <img
                    className={`mt-15`}
                    src={curIngredient?.image_large}
                    alt={curIngredient?.name}
                />
                <p className="text text_type_main-medium mt-4 mb-8">
                    {curIngredient?.name}
                </p>
                <IngredientsModalTable selectedItem={curIngredient} />
            </div>
        </div>
    )
}