import {IngredientsModalTable} from "../burgeringredients/ingredients-modal-table";
import {Modal} from "./modal";
import PropTypes from "prop-types";
import {useCallback, useEffect, useState} from "react";
import {hideIngredientIfoModal, showIngredientIfoModal} from "../../services/actions/current-ingredient";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {showIngredientInfo} from "../../services/selectors/current-ingredient-info";

export const IngredientDetailsModal = ({}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selectedItem = useSelector(showIngredientInfo)
    const [ingredientInModal, setIngredientInModal] = useState()
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        setIngredientInModal(selectedItem[0])
    }, [selectedItem])

    const handleModal = useCallback((selectedItem) => {
        dispatch(showIngredientIfoModal(selectedItem))
        setIsOpenModal(!isOpenModal);
    }, [selectedItem])

    useEffect(() => {
        if (!isOpenModal){
            navigate(-1)
            dispatch(hideIngredientIfoModal())
        }
    }, [dispatch, isOpenModal])

    useEffect(() => {
        if(ingredientInModal){
            handleModal(ingredientInModal)
        }
    }, [ingredientInModal])


    return(
        <Modal closeModal={handleModal} title='Детали ингридиента'>
            {ingredientInModal ?
                <>
                    <img
                        className={`mt-15`}
                        src={`${ingredientInModal.image_large}`}
                        alt={ingredientInModal.name}
                    />
                    <p className="text text_type_main-medium mt-4 mb-8">
                        {ingredientInModal.name}
                    </p>
                    <IngredientsModalTable selectedItem={ingredientInModal} />
                </>
                :
                <p>Идет загрузка информации</p>
            }
        </Modal>
    )
}

IngredientDetailsModal.propTypes = {
    handleModal: PropTypes.func,
    selectedItem: PropTypes.object
}