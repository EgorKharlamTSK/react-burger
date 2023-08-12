import {IngredientsModalTable} from "../burgeringredients/ingredients-modal-table";
import {Modal} from "./modal";
import PropTypes from "prop-types";

export const IngredientDetailsModal = ({handleModal,selectedItem}) => {
    return(
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
    )
}

IngredientDetailsModal.propTypes = {
    handleModal: PropTypes.func,
    selectedItem: PropTypes.object
}