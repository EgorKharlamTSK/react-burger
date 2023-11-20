    import React, {FC} from "react";
    import modalStyles from './modal.module.css'
    import {IModalOverlayPropTypes} from "../../utils/types";

    export const ModalOverlay:FC<IModalOverlayPropTypes> = ({ closeModal }) => {
        return (
            <div className={modalStyles.overlay} onClick={closeModal}>
            </div>
        );
    };