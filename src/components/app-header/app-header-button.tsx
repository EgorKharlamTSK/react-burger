import React, {FC, ReactNode, useState} from "react";
import btnStyle from './app-header.module.css'
import PropTypes from "prop-types";
import {Link, NavLink} from "react-router-dom";

interface IAppHeaderBtn {
    text: string
    icon: ReactNode
    path?: string
}

export const AppHeaderButton: FC<IAppHeaderBtn> = ({text, icon, path = "/feed"}) => {
    const [hover, setHover] = useState(false)

    return(
        <NavLink
            onMouseEnter = {() => setHover(true)}
            onMouseLeave = {() => setHover(false)}
            to={path}
            className={`${btnStyle.header_button} pt-4 pb-4 pl-5 pr-5`}
        >
            <span>
                {icon}
            </span>
            <span className='ml-1 text text_type_main-default'>{text}</span>
        </NavLink>
    )
}