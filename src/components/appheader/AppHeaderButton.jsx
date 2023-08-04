import React, {useState} from "react";
import btnStyle from './AppHeader.module.css'
import PropTypes from "prop-types";

export const AppHeaderButton = ({text, icon, iconHover}) => {
    const [hover, setHover] = useState(false)

    return(
        <a
           onMouseEnter = {() => setHover(true)}
           onMouseLeave = {() => setHover(false)}
           href="/"
           className={`${btnStyle.header_button} pt-4 pb-4 pl-5 pr-5`}
        >
            {!hover ? (
                <span>{icon}</span>
            ) : (
                <span>{iconHover}</span>
            )}
            <span className='ml-1 text text_type_main-default'>{text}</span>
        </a>
    )
}

AppHeaderButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    iconHover: PropTypes.object.isRequired
};
