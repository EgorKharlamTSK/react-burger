import React from "react";
import {createPortal} from "react-dom";
import modalStyles from './modal.module.css'
import {ModalOverlayPropTypes} from "../../utils/props-types";

export const ModalOverlay = ({ closeModal, children }) => {
    return createPortal(
        <div className={modalStyles.overlay} onClick={closeModal}>
            {children}
        </div>,
        document.getElementById("modal")
    );
}

ModalOverlay.propTypes = ModalOverlayPropTypes