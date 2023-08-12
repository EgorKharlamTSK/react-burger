import React, { useEffect } from "react";
import {ModalOverlay} from "./modal-overlay";
import modalStyles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalPropTypes} from "../../utils/props-types";
import {createPortal} from "react-dom";

export const Modal = ({ title, closeModal, children }) => {
    const modalBlock = document.getElementById("modal");
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

    return createPortal(
        <>
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
            <ModalOverlay closeModal={closeModal} />
        </>,
        modalBlock
    );
};

Modal.propTypes = ModalPropTypes;