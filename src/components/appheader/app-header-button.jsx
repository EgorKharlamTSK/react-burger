import React, {useState} from "react";
import btnStyle from './app-header.module.css'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export const AppHeaderButton = ({text, icon, path = "/"}) => {
    const [hover, setHover] = useState(false)

    return(
        <Link
            onMouseEnter = {() => setHover(true)}
            onMouseLeave = {() => setHover(false)}
            to={path}
            className={`${btnStyle.header_button} pt-4 pb-4 pl-5 pr-5`}
        >
            <span>
                {icon}
            </span>
            <span className='ml-1 text text_type_main-default'>{text}</span>
        </Link>
    )
}

AppHeaderButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    path: PropTypes.string
};
