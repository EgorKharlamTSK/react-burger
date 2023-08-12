    import React from "react";
    import modalStyles from './modal.module.css'
    import {ModalOverlayPropTypes} from "../../utils/props-types";

    export const ModalOverlay = ({ closeModal }) => {
        return (
            <div className={modalStyles.overlay} onClick={closeModal}>
            </div>
        );
    };

    ModalOverlay.propTypes = ModalOverlayPropTypes