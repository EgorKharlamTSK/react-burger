import modalStyles from "../modal/modal.module.css";
import PropTypes from "prop-types";

export const IngredientsModalTable = ({selectedItem}) => {
    return(
        <table className={modalStyles.tableInModal}>
            <thead>
                <tr>
                    <td>
                        <p className="text text_type_main-medium">Калории,ккал</p>
                    </td>
                    <td>
                        <p className="text text_type_main-medium">Белки, г</p>
                    </td>
                    <td>
                        <p className="text text_type_main-medium">Жиры, г</p>
                    </td>
                    <td>
                        <p className="text text_type_main-medium">Углеводы, г</p>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <p className="text text_type_main-medium">{selectedItem.calories}</p>
                    </td>
                    <td>
                        <p className="text text_type_main-medium">{selectedItem.proteins}</p>
                    </td>
                    <td>
                        <p className="text text_type_main-medium">{selectedItem.fat}</p>
                    </td>
                    <td>
                        <p className="text text_type_main-medium">{selectedItem.carbohydrates}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

IngredientsModalTable.propTypes = {
    selectedItem: PropTypes.object
}
