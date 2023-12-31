import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAllIngredients} from "../../../services/selectors/burger-ingredients";
import styles from "../../../components/burger-ingredients/burger-ingridients.module.css"
import {IngredientDetails} from "../../../components/ingredient-details/ingredient-details";
import {IBurgerItemData} from "../../../utils/types";
import {useSelector} from "../../../services/hooks/use-selector";

export const BurgerIngredientPage = () => {
    const params = useParams();
    const ingredientId = params.id;
    const ingredientsData = useSelector(getAllIngredients);
    const [curIngredient, setCurIngredient] = useState<IBurgerItemData>();

    const searchWatchIngredient = () => {
        const usefulIngr = ingredientsData.filter((item: IBurgerItemData) => {
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