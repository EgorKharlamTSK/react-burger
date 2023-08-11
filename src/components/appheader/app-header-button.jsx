import React, {useState} from "react";
import btnStyle from './app-header.module.css'
import PropTypes from "prop-types";

export const AppHeaderButton = ({text, icon}) => {
    const [hover, setHover] = useState(false)

    return(
        <a
           onMouseEnter = {() => setHover(true)}
           onMouseLeave = {() => setHover(false)}
           href="/"
           className={`${btnStyle.header_button} pt-4 pb-4 pl-5 pr-5`}
        >
            <span>
                {icon}
            </span>
            <span className='ml-1 text text_type_main-default'>{text}</span>
        </a>
    )
}

AppHeaderButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
};
