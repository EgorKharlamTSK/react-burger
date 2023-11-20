import React, {useState} from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {AppHeaderButton} from "./app-header-button";
import headerStyles from './app-header.module.css'
import {Link} from "react-router-dom";
export const AppHeader = () => {
    const [hoverConstr, setHoverConstr] = useState(false);
    const [hoverList, setHoverList] = useState(false);
    const [hoverLk, setHoverLk] = useState(false);

    return(
        <header className={`${headerStyles.header_bg}`}>
            <div className={`container ${headerStyles.header}`}>
                <nav className={headerStyles.btn_groups_header}>
                    <AppHeaderButton
                        text="Конструктор"
                        icon={<BurgerIcon type={hoverConstr ? 'primary' : 'secondary'} />}
                    />

                    <AppHeaderButton
                        text="Лента заказов"
                        icon={<ListIcon type={hoverList ? 'primary' : 'secondary'} />}
                    />
                </nav>
                <Link to={"/"} >
                    {/*// @ts-ignore*/}
                    <Logo className='-m-l-5' />
                </Link>
                <AppHeaderButton
                    text="Личный камбинет"
                    icon={<ProfileIcon type={hoverLk ? 'primary' : 'secondary'} />}
                    path="/profile"
                />
            </div>
        </header>
    )
}