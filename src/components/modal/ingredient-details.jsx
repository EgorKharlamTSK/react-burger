import { IngredientsModalTable } from "../burgeringredients/ingredients-modal-table";
import { Modal } from "./modal";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { hideIngredientIfoModal, showIngredientIfoModal } from "../../services/actions/current-ingredient";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {showIngredientInfo, showIngredientLoading} from "../../services/selectors/current-ingredient-info";
import {getAllIngredients} from "../../services/selectors/burger-ingredients";

export const IngredientDetailsModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredientsData = useSelector(getAllIngredients)
    const [ingredientInModal, setIngredientInModal] = useState(null)
    const params = useParams()
    const {id} = params

    useEffect(() => {
        const usefulIngr = ingredientsData.filter((item) => {
            return item._id === id
        })
        setIngredientInModal(usefulIngr[0])
    }, [ingredientsData]);

    const handleCloseModal = () => {
        dispatch(hideIngredientIfoModal());
        navigate(-1);
    };

    return (
        <Modal closeModal={handleCloseModal} title='Детали ингридиента'>
            {ingredientInModal && (
                <>
                    <img className="mt-15" src={ingredientInModal.image_large} alt={ingredientInModal.name} />
                    <p className="text text_type_main-medium mt-4 mb-8">{ingredientInModal.name}</p>
                    <IngredientsModalTable selectedItem={ingredientInModal} />
                </>
            )}
        </Modal>
    );
};

IngredientDetailsModal.propTypes = {
    handleModal: PropTypes.func,
    selectedItem: PropTypes.object,
};