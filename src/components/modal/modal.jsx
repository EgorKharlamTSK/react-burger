import React, { useEffect } from "react";
import {ModalOverlay} from "./modal-overlay";
import modalStyles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIngridientsItem} from "../burgeringredients/burger-ingridients-item";
import {ModalPropTypes, modalPropTypes} from "../../utils/props-types";

export const Modal = ({ title, closeModal, children }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeModal]);


    return(
        <ModalOverlay closeModal={closeModal}>
            <div className={`${modalStyles.modal} pb-15 pt-10 pl-10 pr-10`}>
                <div className="modalContent">
                    <header className={modalStyles.modalHeader}>
                        <h2 className="text text_type_main-large">{title}</h2>
                        <button className={modalStyles.modalClose} onClick={closeModal}>
                            <CloseIcon type="primary" />
                        </button>
                    </header>
                    <div className={modalStyles.modalBody}>{children}</div>
                </div>
            </div>
        </ModalOverlay>
    );

};

Modal.propTypes = ModalPropTypes