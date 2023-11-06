import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAllIngredients} from "../../../services/selectors/burger-ingredients";
import styles from "../../../components/burger-ingredients/burger-ingridients.module.css"
import {IngredientDetails} from "../../../components/ingredient-details/ingredient-details";

export const BurgerIngredientPage = () => {
    const params = useParams();
    const ingredientId = params.id;
    const ingredientsData = useSelector(getAllIngredients);
    const [curIngredient, setCurIngredient] = useState();

    const searchWatchIngredient = () => {
        const usefulIngr = ingredientsData.filter((item) => {
            return item._id === ingredientId;
        });
        setCurIngredient(usefulIngr[0]);
    };

    useEffect(() => {
        searchWatchIngredient();
    }, [ingredientsData]);

    return (
        <div className={styles.ingredient_parent_page}>
            <div className={styles.ingredient_on_page}>
                <IngredientDetails ingredient={curIngredient} />
            </div>
        </div>
    );
};