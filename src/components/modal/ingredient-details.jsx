import { Modal } from "./modal";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { hideIngredientIfoModal } from "../../services/actions/current-ingredient";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getAllIngredients} from "../../services/selectors/burger-ingredients";
import {IngredientDetails} from "../ingredient-details/ingredient-details";

export const IngredientDetailsModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredientsData = useSelector(getAllIngredients);
    const [ingredientInModal, setIngredientInModal] = useState(null);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const usefulIngr = ingredientsData.filter((item) => {
            return item._id === id;
        });
        setIngredientInModal(usefulIngr[0]);
    }, [ingredientsData]);

    const handleCloseModal = () => {
        dispatch(hideIngredientIfoModal());
        navigate(-1);
    };

    return (
        <Modal closeModal={handleCloseModal} title="Детали ингридиента">
            <IngredientDetails ingredient={ingredientInModal} />
        </Modal>
    );
};
IngredientDetailsModal.propTypes = {
    handleModal: PropTypes.func,
    selectedItem: PropTypes.object,
};