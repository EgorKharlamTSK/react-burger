import {IngredientsModalTable} from "../burger-ingredients/ingredients-modal-table";
import {IBurgerItemData} from "../../utils/types";
import {FC} from "react";
interface IIngredientDetails {
    ingredient: IBurgerItemData | undefined
}
export const IngredientDetails:FC<IIngredientDetails> = ({ ingredient }) => {
    return (
        <>
            {ingredient && (
                <>
                    <img className="mt-15" src={ingredient.image_large} alt={ingredient.name} />
                    <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
                    <IngredientsModalTable selectedItem={ingredient} />
                </>
            )}
        </>
    );
}