import {IngredientsModalTable} from "../burgeringredients/ingredients-modal-table";
import {Modal} from "./modal";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const IngredientDetailsModal = ({handleModal, selectedItem, isOpenModal}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(selectedItem){
            handleModal(selectedItem)
        }
    }, [selectedItem])


    const onDismiss = () => {
        navigate(-1)
    }

    return(
        <Modal closeModal={onDismiss} title='Детали ингридиента'>
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