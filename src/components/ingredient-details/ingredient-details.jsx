import {IngredientsModalTable} from "../burger-ingredients/ingredients-modal-table";
import {IngredientsDetailsPropTypes} from "../../utils/props-types";

export const IngredientDetails = ({ ingredient }) => {
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

IngredientDetails.propTypes = IngredientsDetailsPropTypes